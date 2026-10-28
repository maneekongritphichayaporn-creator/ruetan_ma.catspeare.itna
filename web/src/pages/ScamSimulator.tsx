import React, { useState, useEffect } from 'react';
import liff from '@line/liff';

// 1. กำหนด Type Structure สำหรับข้อมูล Scenario และ Choice
interface Choice {
  id: 'A' | 'B' | 'C';
  text: string;
  isScamTrap: boolean;
  feedback: string;
  explanation: string;
  legalNote: string;
}

interface Scenario {
  id: number;
  title: string;
  senderName: string;
  senderAvatar: string;
  botInitialMessages: string[];
  choices: Choice[];
}

interface ChatItem {
  sender: 'bot' | 'user';
  text: string;
}

// 2. Mock Data สำหรับจำลองสถานการณ์
const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "กรณีที่ 1: คืนเงินค่าประกันมิเตอร์ไฟฟ้า",
    senderName: "การไฟฟ้าส่วนภูมิภาค (Official ปลอม)",
    senderAvatar: "⚡",
    botInitialMessages: [
      "เรียนคุณลูกค้า เนื่องด้วยนโยบายคืนเงินค่าประกันการใช้ไฟฟ้าประจำปี",
      "ระบบพบว่าท่านมียอดเงินคืนคงค้าง 3,250 บาท",
      "โปรดดาวน์โหลดแอปพลิเคชันเพื่อยืนยันตัวตนและรับเงินคืนทันที: http://pea-refund.online/app.apk"
    ],
    choices: [
      {
        id: 'A',
        text: "กดลิงก์ทันที เพราะอยากได้เงินคืน และกลัวเสียสิทธิ์",
        isScamTrap: true,
        feedback: "อันตรายมาก! โดนหลอกแล้ว",
        explanation: "การดาวน์โหลดไฟล์ .apk จากภายนอก Store เป็นเทคนิคของมิจฉาชีพ เพื่อขอสิทธิ์ 'Accessibility Service' ในการเข้าควบคุมโทรศัพท์และโอนเงินออกจากบัญชี",
        legalNote: "การส่งลิงก์หลอกติดตั้งมัลแวร์ เข้าข่ายความผิดตาม พ.ร.บ.คอมพิวเตอร์ฯ มาตรา 14 (นำเข้าข้อมูลเท็จ) และ พ.ร.ก.มาตรการป้องกันและปราบปรามอาชญากรรมทางเทคโนโลยี"
      },
      {
        id: 'B',
        text: "โทรสอบถามคอลเซ็นเตอร์ 1129 หรือตรวจสอบผ่านแอป PEA Smart Plus โดยตรง",
        isScamTrap: false,
        feedback: "ถูกต้อง! ปลอดภัย 100%",
        explanation: "หน่วยงานรัฐวิสาหกิจไม่มีนโยบายส่ง SMS หรือทักแชตแจกลิงก์ดาวน์โหลดไฟล์ .apk การตรวจสอบผ่านช่องทางทางการโดยตรงคือวิธีป้องกันที่ดีที่สุด",
        legalNote: "หากพบลิงก์หรือเว็บไซต์ลักษณะนี้ สามารถแจ้งเบาะแสได้ที่ศูนย์ AOC 1441 ทันที"
      }
    ]
  }
];

export const ScamSimulator: React.FC = () => {
  const [liffInitialized, setLiffInitialized] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<
    Awaited<ReturnType<typeof liff.getProfile>> | null
  >(null);
  const [currentScenarioIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);

  const scenario = SCENARIOS[currentScenarioIndex];

  // Initialize LIFF SDK
  useEffect(() => {
    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID || "YOUR_LIFF_ID";
        await liff.init({ liffId });
        setLiffInitialized(true);

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("LIFF Init Error:", error);
      }
    };
    initLiff();
  }, []);

  // เริ่มต้นบทสนทนาเมื่อโหลด Scenario
  useEffect(() => {
    if (scenario) {
      const initialChats: ChatItem[] = scenario.botInitialMessages.map((msg) => ({
        sender: 'bot',
        text: msg
      }));
      setChatHistory(initialChats);
      setSelectedChoice(null);
    }
  }, [scenario]);

  // ฟังก์ชันเมื่อผู้เล่นกดเลือกคำตอบ
  const handleSelectChoice = (choice: Choice) => {
    if (selectedChoice) return;

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: choice.text }
    ]);
    setSelectedChoice(choice);
  };

  // ส่งผลการทดสอบกลับเข้าห้องแชต LINE
  const handleSendSummaryToChat = async () => {
    if (!liff.isInClient()) {
      alert("ฟังก์ชันนี้ใช้งานได้เมื่อเปิดผ่านแอป LINE เท่านั้น");
      return;
    }

    if (!selectedChoice) return;

    try {
      await liff.sendMessages([
        {
          type: "text",
          text: `[ผลทดสอบ Scam Simulator - รู้ทัน]\nหัวข้อ: ${scenario.title}\nผลลัพธ์: ${selectedChoice.feedback}\nข้อแนะนำ: ${selectedChoice.explanation}`
        }
      ]);
      liff.closeWindow();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🛡️</span>
          <div>
            <h1 className="font-bold text-sm">ห้องซ้อมรับมือ Scam</h1>
            <p className="text-[10px] text-slate-400">
              {liffInitialized ? "ระบบพร้อมใช้งาน" : "กำลังเชื่อมต่อ LIFF..."}
            </p>
          </div>
        </div>
        {userProfile?.pictureUrl && (
          <img
            src={userProfile.pictureUrl}
            alt={userProfile.displayName || "User Avatar"}
            className="w-8 h-8 rounded-full border border-slate-600"
          />
        )}
      </header>

      {/* Chat Area */}
      <main className="flex-1 p-4 overflow-y-auto space-y-3">
        <div className="text-center my-2">
          <span className="bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
            {scenario.title}
          </span>
        </div>

        {chatHistory.map((item, idx) => {
          const isBot = item.sender === 'bot';
          return (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${
                isBot ? 'justify-start' : 'justify-end'
              }`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {scenario.senderAvatar}
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isBot
                    ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                    : 'bg-emerald-600 text-white rounded-tr-none'
                }`}
              >
                {isBot && (
                  <p className="text-[10px] font-semibold text-red-500 mb-1">
                    {scenario.senderName}
                  </p>
                )}
                <p className="break-words">{item.text}</p>
              </div>
            </div>
          );
        })}

        {/* ผลการประเมินเมื่อเลือกคำตอบ */}
        {selectedChoice && (
          <div
            className={`mt-4 p-4 rounded-xl border transition-all ${
              selectedChoice.isScamTrap
                ? 'bg-red-50 border-red-200 text-red-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="flex items-center space-x-2 font-bold text-sm mb-1">
              <span>{selectedChoice.isScamTrap ? '❌' : '✅'}</span>
              <span>{selectedChoice.feedback}</span>
            </div>
            <p className="text-xs mb-2 leading-relaxed text-slate-700">
              {selectedChoice.explanation}
            </p>
            <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-800">📌 ข้อกฎหมายที่เกี่ยวข้อง: </span>
              {selectedChoice.legalNote}
            </div>

            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleSendSummaryToChat}
                className="w-full bg-slate-800 text-white text-xs font-semibold py-2.5 px-3 rounded-lg hover:bg-slate-700 transition active:scale-95"
              >
                ส่งผลสรุปกลับเข้าห้องแชต
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Choice Buttons */}
      <footer className="p-4 bg-white border-t border-slate-200 space-y-2">
        <p className="text-xs text-slate-500 font-semibold mb-2">
          หากเจอข้อความลักษณะนี้ คุณจะดำเนินการอย่างไร?
        </p>
        {scenario.choices.map((choice) => (
          <button
            key={choice.id}
            disabled={selectedChoice !== null}
            onClick={() => handleSelectChoice(choice)}
            className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition ${
              selectedChoice
                ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-500'
                : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 shadow-sm active:scale-[0.98]'
            }`}
          >
            <span className="font-bold mr-2 text-slate-900">[{choice.id}]</span>
            {choice.text}
          </button>
        ))}
      </footer>
    </div>
  );
};

export default ScamSimulator;