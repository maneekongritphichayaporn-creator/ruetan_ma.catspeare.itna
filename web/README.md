# รู้ทัน-ไม่ตกเป็นเหยื่อภัยไซเบอร์ — Web Application

เว็บไซต์ "รู้ทัน-ไม่ตกเป็นเหยื่อภัยไซเบอร์"
เป็นเว็บแอปพลิเคชันที่มุ่งให้ความรู้และเผยแพร่ข้อมูลเตือนภัยออนไลน์ เพื่อช่วยให้ประชาชนรู้เท่าทันกลโกงและมิจฉาชีพในโลกดิจิทัล พร้อมเปิดช่องทางให้ผู้ใช้งานส่งข้อมูลเบาะแสเกี่ยวกับเหตุการณ์หรือช่องทางที่อาจเกี่ยวข้องกับมิจฉาชีพ

## Features

- เผยแพร่ข่าวสารและข้อมูลเตือนภัยออนไลน์
- ให้ความรู้เกี่ยวกับกลโกงออนไลน์และแนวทางป้องกันตนเอง
- เปิดช่องทางให้ผู้ใช้งานส่งข้อมูลเบาะแสที่เกี่ยวข้องกับภัยออนไลน์
- รองรับการส่งสรุปจาก LIFF เข้าแชต LINE ในหน้าคู่มือและหน้าส่งเรื่อง
- แสดงข้อมูลเกี่ยวกับเว็บไซต์ นโยบายความเป็นส่วนตัว และเงื่อนไขการใช้งาน

## Technologies

- **React** — สร้างส่วนติดต่อผู้ใช้งาน (UI)
- **TypeScript** — เพิ่มความปลอดภัยด้านชนิดข้อมูล
- **Vite** — เครื่องมือสำหรับพัฒนาและ build เว็บไซต์
- **CSS** — จัดรูปแบบและออกแบบหน้าตาเว็บไซต์
- **npm** — จัดการ dependencies และ scripts

## Prerequisites

ก่อนเริ่มใช้งาน ควรติดตั้งโปรแกรมต่อไปนี้

- [Node.js](https://nodejs.org/) เวอร์ชันที่รองรับโดยโปรเจกต์
- npm ซึ่งติดตั้งมาพร้อมกับ Node.js

ตรวจสอบเวอร์ชันด้วยคำสั่ง

```bash
node -v
npm -v
```

## Installation

1. เปิด Terminal หรือ Command Prompt
2. เข้าไปยังโฟลเดอร์ `web`

```bash
cd web
```

3. ติดตั้ง dependencies

```bash
npm install
```

## Development

ฟังก์ชัน LIFF ต้องกำหนด LIFF ID ใน environment ก่อนใช้งาน สร้างไฟล์ `.env.local`
ภายในโฟลเดอร์ `web` โดยกำหนดค่า:

```env
VITE_LIFF_ID=your-liff-id
```

กำหนด URL ของเว็บเป็น Endpoint URL ใน LIFF Console และตั้งค่า `VITE_LIFF_ID`
ใน environment ของระบบ deploy ด้วย ห้าม commit ไฟล์ `.env.local` ลง repository
หากไม่ได้ตั้งค่า LIFF ID เว็บไซต์ยังใช้งานได้ตามปกติ แต่ปุ่มส่งข้อความเข้า LINE จะไม่พร้อมใช้งาน

เริ่มต้น development server ด้วยคำสั่ง

```bash
npm run dev
```

เปิด URL ที่แสดงใน Terminal เพื่อเข้าใช้งานเว็บไซต์ โดยทั่วไป Vite จะใช้ `http://localhost:5173`

เมื่อแก้ไข source code ระบบจะแสดงการเปลี่ยนแปลงระหว่างพัฒนาโดยอัตโนมัติ

## Build

สร้างไฟล์สำหรับ production ด้วยคำสั่ง

```bash
npm run build
```

ไฟล์ผลลัพธ์จะอยู่ในโฟลเดอร์ที่กำหนดไว้ใน Vite configuration ซึ่งโดยปกติคือ `dist/` หากไม่ได้ปรับเปลี่ยนการตั้งค่า

## Preview Production Build

หลังจาก build สำเร็จ สามารถทดลองเปิดเว็บไซต์เวอร์ชัน production ได้ด้วยคำสั่ง

```bash
npm run preview
```

จากนั้นเปิด URL ที่แสดงใน Terminal

## Project Structure

```text
web/
├── public/             # Static assets
├── src/                # Application source code
├── index.html          # HTML entry point
├── package.json        # Project metadata and scripts
├── package-lock.json   # Locked dependency versions
├── vite.config.mts     # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

โครงสร้างนี้แสดงไฟล์หลักของโปรเจกต์เท่านั้น โดยอาจมีไฟล์และโฟลเดอร์อื่นเพิ่มเติมตามการตั้งค่าจริง

## Development Notes

- ควรเก็บ `package.json` และ `package-lock.json` ไว้ใน repository
- ไม่จำเป็นต้องเก็บ `node_modules/` ใน Git เพราะสามารถติดตั้งใหม่ด้วย `npm install`
- ไฟล์ build สามารถสร้างใหม่ได้ด้วย `npm run build`
- หลีกเลี่ยงการ commit API keys, passwords, access tokens หรือข้อมูลลับลงใน repository
- ก่อน deploy ควรตรวจสอบ environment variables, routing, API endpoints และการตั้งค่าที่เกี่ยวข้องกับ production

## Disclaimer

เว็บไซต์รู้ทันมีวัตถุประสงค์เพื่อให้ความรู้และเผยแพร่ข้อมูลเตือนภัยออนไลน์ รวมถึงเปิดช่องทางรับข้อมูลเบาะแสเท่านั้น เว็บไซต์ไม่ใช่หน่วยงานรับแจ้งความ ไม่ใช่ผู้ให้บริการอายัดบัญชี และไม่ใช่ช่องทางฉุกเฉิน หากเกิดเหตุควรติดต่อหน่วยงานที่เกี่ยวข้องโดยตรง

## License

โปรเจกต์นี้เผยแพร่ภายใต้ MIT License ซึ่งอนุญาตให้นำไป ใช้งาน ดัดแปลง แก้ไข หรือแจกจ่ายต่อได้ฟรี ทั้งในเชิงพาณิชย์และส่วนตัว โดยต้องคงประกาศลิขสิทธิ์เดิมไว้

**ผู้จัดทำ: พิชญาภร มณีคงฤทธิ์ | Phichayaporn Maneekongrit**
