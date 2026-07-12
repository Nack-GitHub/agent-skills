# 📘 คู่มือและขั้นตอนการตรวจสอบสำหรับนำเข้า Skill ใหม่ (New Skill Integration Checklist)

คู่มือนี้สรุปหลักการสำคัญจาก **"Agent Skills: The New Primitive for AI Specialization"** เพื่อใช้เป็นมาตรฐานเมื่อต้องการเพิ่ม Skill ใหม่เข้ามาในโปรเจกต์ ป้องกันปัญหาคำสั่งชนกัน (Routing Collision) และปัญหาข้อมูลล้นหน้าต่างบริบท (Context Overflow/Rot)

---

## 📋 5 ขั้นตอนหลักในการบูรณาการ Skill ใหม่

### ขั้นตอนที่ 1: ตรวจสอบขนาดและจำกัดจำนวนคำ (Token Budget Check)
*   **เป้าหมาย:** ป้องกันปัญหา Context Overflow ที่ทำให้อบิลิตี้ของเอเจนต์เสื่อมถอย
*   **แนวปฏิบัติ:** 
    *   ไฟล์ `SKILL.md` หลักควรมีขนาดไม่เกิน **2,000 คำ (Words)** หรือประมาณ **15KB**
    *   **Progressive Disclosure:** หากมีตัวอย่างโค้ดจำนวนมาก หรือเนื้อหาเฉพาะด้านที่ยาวเกินไป ให้แยกเนื้อหานั้นไปใส่ไว้ในโฟลเดอร์ย่อย `references/` หรือ `assets/` และอ้างอิงลิงก์จากไฟล์หลักแทน

### ขั้นตอนที่ 2: ป้องกันการชนกันของระบบนำร่อง (Routing Collision Check)
*   **เป้าหมาย:** หลีกเลี่ยงเหตุการณ์ที่เอเจนต์เปิดใช้งาน Skill ผิดตัวเมื่อมีความต้องการที่ซ้อนทับกัน
*   **แนวปฏิบัติ:** 
    1.  **วิเคราะห์ความทับซ้อน:** ค้นหาว่ามี Skill เดิมที่มีขอบเขตการทำงาน (Scope) คล้ายกันหรือไม่ (เช่น Skill เฉพาะภาษา/เฟรมเวิร์ก เทียบกับ Skill ทั่วไปแบบ Generic)
    2.  **ระบุ Anti-Triggers ใน YAML Frontmatter:** 
        *   ใน Skill ใหม่: ใส่ `DO NOT USE FOR` ในฟิลด์ `description` เพื่อบอกว่าเมื่อใดควรหลีกเลี่ยง และแนะนำให้โยนไป Skill ใด
        *   ใน Skill เก่าที่มีอยู่: อัปเดต `DO NOT USE FOR` ให้แนะนำผู้ใช้ว่าหากเป็นงานเฉพาะทางด้านนี้ (เช่น .NET) ให้ใช้ Skill ใหม่แทน
    3.  ** front-load keywords:** เขียนประโยคเปิดใน `description` ด้วยคีย์เวิร์ดที่ชัดเจนและจำเพาะเจาะจง

### ขั้นตอนที่ 3: ลงทะเบียนระบบจัดสรรงาน (Intent → Skill Mapping Update)
*   **เป้าหมาย:** บันทึกเส้นทางการส่งต่อคำสั่งให้เอเจนต์ตัวหลักรู้ตัวทันทีเมื่อตรวจจับคีย์เวิร์ด
*   **แนวปฏิบัติ:** 
    *   เปิดไฟล์ [AGENTS.md](../AGENTS.md)
    *   เพิ่มความสัมพันธ์ระหว่าง **Intent (ความต้องการของผู้ใช้)** และ **Skill Name** ลงในตาราง `Intent → Skill Mapping` เสมอ

### ขั้นตอนที่ 4: ปรับปรุงคำนิยามของเอเจนต์ (Agent Persona Synchronization)
*   **เป้าหมาย:** สื่อสารกับเอเจนต์ย่อยแต่ละตัว (เช่น `code-reviewer`, `security-auditor`, `test-engineer`) ให้เรียกใช้กลยุทธ์ตาม Skill ใหม่ได้ถูกต้อง
*   **แนวปฏิบัติ:** 
    *   เปิดไฟล์เอเจนต์ที่เกี่ยวข้องในโฟลเดอร์ `agents/` (เช่น [code-reviewer.md](../agents/code-reviewer.md))
    *   เพิ่มกฎหรือหัวข้อย่อยสำหรับงานประเภทนั้น และใส่ลิงก์อ้างอิง `(refer to <new-skill-name> skill)` เพื่อบังคับใช้พฤติกรรม

### ขั้นตอนที่ 5: ตรวจสอบความถูกต้องทางโครงสร้าง (Operational Checks)
*   **เป้าหมาย:** แน่ใจว่าไฟล์ที่ถูกเพิ่มเข้ามาไม่มี Syntax ผิดพลาด
*   **แนวปฏิบัติ:** 
    1.  YAML Frontmatter ต้องมีโครงสร้างครบถ้วน (`name`, `description`, `license`)
    2.  ลิงก์เชื่อมโยงไปยังไฟล์อื่นต้องใช้ URI แบบสัมพัทธ์ (Relative URI) เช่น `[link](../path/to/file)` และไม่มีเครื่องหมาย backticks ครอบลิงก์
    3.  ทดสอบการรันแบบ dry-run เพื่อสังเกตพฤติกรรมการเรียกใช้งานของเอเจนต์

---

## 💡 ตัวอย่างการเขียน Anti-Triggers ที่มีประสิทธิภาพ

| ประเภทการชนกัน | การตั้งค่าที่ถูกต้อง |
| :--- | :--- |
| **Generic API Design vs .NET Web API** | **Generic Skill:** `DO NOT USE FOR: implementation details of ASP.NET Core Web APIs (use dotnet-webapi instead).`<br>**.NET Skill:** `DO NOT USE FOR: general language-agnostic API design (use api-and-interface-design).` |
| **Generic Performance vs EF Core Query** | **Generic Skill:** `DO NOT USE FOR: Entity Framework Core queries optimization specifically (use optimizing-ef-core-queries instead).`<br>**.NET Skill:** `DO NOT USE FOR: general performance optimization (use performance-optimization).` |
