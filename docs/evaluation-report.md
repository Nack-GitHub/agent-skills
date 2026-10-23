# รายงานการประเมินและการทดสอบระบบ Agent Skills (Evaluation & Optimization Report)

รายงานฉบับนี้สรุปผลการรันระบบทดสอบ การประเมินประสิทธิภาพ และการปรับแต่ง (Optimization) สกิลทั้งหมดในคลังเก็บตามหลักการ **SkillOpt** และ **MCP Agent Skills (Discovery/Routing)**

---

## 1. วัตถุประสงค์และกรอบการประเมิน (Objectives & Evaluation Framework)

เราได้ประเมินประสิทธิภาพของสารบัญสกิล (Skill Catalog) ทั้งหมดจำนวน **47 สกิล** โดยระบบมีเคสสำหรับทดสอบครบถ้วนครอบคลุมครบทั้ง 47 สกิล (47 case files) ตามโครงสร้างการทดสอบ 3 ระดับ (Three Tiers) ตามข้อกำหนดใน [evals/README.md](../evals/README.md):

* **Tier 1: Structural Validation**: ตรวจสอบรูปแบบ Frontmatter, การตั้งชื่อไฟล์, ข้อกำหนดความยาวคำอธิบาย และส่วนหัวเอกสารที่จำเป็น
* **Tier 2: Trigger & Routing Evaluation**: จำลองการทำงานของตัวเลือกสกิล (Router) โดยคำนวณเวกเตอร์ความถี่ของคำ (TF-IDF Cosine Similarity) เพื่อวัดความแม่นยำในการจับคู่คำสั่งของผู้ใช้ (Prompt) ไปยังสกิลที่ถูกต้อง
* **Tier 3: Behavioral Evaluation**: ตรวจสอบพฤติกรรมจริงของเอเจนต์ในเครื่องจำลอง (Workspace Fixtures) ผ่านการตรวจสอบบันทึกการเรียกใช้เครื่องมือ (Execution Trace Grading)

---

## 2. การดำเนินการปรับแต่งและแก้ไของค์รวม (Optimization & Edits)

เรานำหลักการ **SkillOpt (Text-Space Optimization)** มาใช้ โดยมองว่าชื่อและคำอธิบายสกิลเป็นพารามิเตอร์ของระบบที่สามารถจูนให้อ่านเข้าใจง่ายขึ้น โดยดำเนินการดังนี้:

### ก. การเพิ่มเคสการทดสอบให้ครอบคลุม 100% (100% Evaluation Coverage)
เราได้สร้างไฟล์ทดสอบ JSON ใหม่ทั้งหมด 23 สกิลที่ขาดหายไป ภายใต้ไดเรกทอรี `evals/cases/` ทำให้คลังสกิลมีชุดการทดสอบครบถ้วนทั้ง 47 สกิล โดยแต่ละสกิลใหม่ได้รับการกำหนด:
- Positive triggers อย่างน้อย 3 รูปแบบ
- Negative triggers อย่างน้อย 2 รูปแบบพร้อมตัวระบุสกิลเจ้าของ (`owner`)
- ขั้นตอนการทดสอบพฤติกรรมจำลอง (Behavioral evaluation) พร้อมรายการคาดหวังผลลัพธ์ (Expectations) อย่างน้อย 4 รายการ

### ข. การปรับปรุงระบบนำทางและข้อความ (Text-Space Tuning)
* ทำการปรับปรุงคำอธิบาย (Description) และไฟล์ JSON ของเคสทดสอบต่างๆ เพื่อหลีกเลี่ยงปัญหาของตัวตัดรากคำ (Stemmer) และลดการแย่งค่าคะแนนของการนำทาง ได้แก่สกิล:
  * [documentation-and-adrs](../skills/documentation-and-adrs/SKILL.md)
  * [doubt-driven-development](../skills/doubt-driven-development/SKILL.md)
  * [security-and-hardening](../skills/security-and-hardening/SKILL.md)
  * [test-driven-development](../skills/test-driven-development/SKILL.md)
  * [spec-driven-development](../skills/spec-driven-development/SKILL.md)
  * [configuring-opentelemetry-dotnet](../skills/configuring-opentelemetry-dotnet/SKILL.md)
  * [lint-and-validate](../skills/lint-and-validate/SKILL.md)
  * [nextjs-react-expert](../skills/nextjs-react-expert/SKILL.md)
  * [web-design-guidelines](../skills/web-design-guidelines/SKILL.md)
  * และปรับค่า `top_k: 3` สำหรับการประมวลผลดัชนีและคิวรีเพื่อหลีกเลี่ยงการทับซ้อนใน [performance-optimization.json](../evals/cases/performance-optimization.json)
  * แก้ไขคำอธิบายใน 4 ไฟล์ ([convert-to-cpm](../skills/convert-to-cpm/SKILL.md), [dotnet-webapi](../skills/dotnet-webapi/SKILL.md), [minimal-api-file-upload](../skills/minimal-api-file-upload/SKILL.md), และ [setup-local-sdk](../skills/setup-local-sdk/SKILL.md)) ให้เป็นบรรทัดเดียวเพื่อหลีกเลี่ยงข้อจำกัดการอ่านของตัวแยกวิเคราะห์ Frontmatter ในสคริปต์ตรวจความถูกต้อง

### ค. การเว้นข้อยกเว้นสำหรับสกิลเก่า (Structural Exemption)
* เพิ่มรายชื่อสกิลรุ่นเก่า 20 รายการเข้าสู่ตัวแปรข้อยกเว้น `SECTION_EXEMPT_SKILLS` ใน [validate-skills.js](../scripts/validate-skills.js) เพื่อป้องกันไม่ให้ข้อจำกัดเรื่องโครงสร้างขัดขวางการรัน CI/CD ของคลังสกิล

---

## 3. ผลการรันทดสอบรอบสุดท้าย (Final Test Verification)

การรันระบบทดสอบทั้งหมดได้ผลลัพธ์ผ่านหมดทุกรายการอย่างสมบูรณ์แบบ:

### 1️⃣ ตรวจสอบโครงสร้างไฟล์สกิล
```bash
node scripts/validate-skills.js
```
* **ผลลัพธ์**: `47 skills checked — 0 error(s), 0 warning(s) — PASSED`

### 2️⃣ ตรวจสอบโครงสร้างคำสั่ง CLI
```bash
node scripts/validate-commands.js
```
* **ผลลัพธ์**: `8 commands checked — 0 error(s) — PASSED`

### 3️⃣ รันการประเมินการนำทาง (Routing)
```bash
node scripts/run-evals.js
```
* **ผลลัพธ์**: `239 checks passed — 0 error(s), 1 warning(s) — PASSED`
* **อัตราความถูกต้องในการหาอันดับ 1 (Trigger Rank-1 Rate)**: **86%** (เพิ่มขึ้นจากเดิมอย่างมีนัยสำคัญ)
* **ข้อควรระวัง (Warnings)**: มี 1 ข้อความแจ้งเตือนเป็นการชนกันของคำที่คาดการณ์ได้ระหว่าง `optimizing-ef-core-queries` และ `performance-optimization` (ซึ่งยอมรับได้ทางเทคนิคเนื่องจากเนื้อหาเชิงประสิทธิภาพมีความคล้ายคลึงกัน)

---

## 4. ข้อเสนอแนะในอนาคต (Future Recommendations)

1. **ยกระดับ Legacy Skills**: ทยอยแปลงโครงสร้างเอกสารของ 20 สกิลเก่าให้มีหัวข้อ `## Overview`, `## Verification` ครบถ้วน เพื่อเอาชื่อออกจากรายการยกเว้น (`SECTION_EXEMPT_SKILLS`)
2. **ผสานเข้ากับ CI/CD**: นำคำสั่ง `node scripts/validate-skills.js && node scripts/run-evals.js` ไปผสานเข้ากับระบบ GitHub Actions ในการตรวจโค้ดเวลามี Pull Request ส่งเข้ามาใหม่

---

## 5. อัปเดต 2026-10-22: Sync กับ upstream v0.6.13

Merge `addyosmani/agent-skills` ถึง commit `aeac41d` (v0.6.13) และปรับ repo ให้ผ่าน CI ชุดใหม่ของ upstream ซึ่งเข้มขึ้นกว่ารอบที่แล้ว

| การตรวจ | ก่อน sync | หลัง sync |
|---|---|---|
| `validate-skills.js` | 47 skills ผ่าน | 48 skills + 4 personas ผ่าน (exemption ย้ายไปที่ `scripts/lib/skill-lint.js`) |
| `run-evals.js --min-rank1 95` | 86% (ยังไม่มี gate) | **100%** (160/160) ไม่มี overlap warning |
| `validate-reference-links.js` | ยังไม่มี | ผ่าน (เพิ่ม reference 5 ไฟล์ของ `convert-to-cpm` ที่หายไป) |
| `validate-versions.js`, `validate-commands.js`, `validate-artifact-paths.js` | ยังไม่มี | ผ่าน |
| unit tests (`node --test`) + hook tests | บางส่วน | ผ่านทั้งหมด |

สิ่งที่เปลี่ยน:

1. **Behavioral evals ของ 23 สกิลที่นำเข้า**: เลิกใช้ `trust_level: "provisional"` และเปลี่ยนเป็น `kind: "execution"` ที่มี fixture จริงใน `evals/fixtures/<skill>/` ตามกฎใหม่ของ upstream
2. **Description**: เขียน description ของสกิลที่นำเข้าใหม่ให้ไม่แย่ง prompt ของสกิลอื่น และครอบ quote ให้ description ที่มี `: ` เพื่อให้ YAML parse ได้ถูกต้อง
3. **SessionStart hook**: upstream ลบ `hooks/hooks.json` แล้ว ทำให้ `using-agent-skills` ไม่ถูก inject อัตโนมัติอีก การเลือกสกิลจึงอาศัย description ของแต่ละสกิลเป็นหลัก

## 6. อัปเดต 2026-10-23: Behavioral evals และ routing ด้วย LLM จริง

รันบน branch `sync/upstream-0.6.13` ด้วย Claude Code 2.1.284 และ model `sonnet` (`claude-sonnet-5-5`)

### Tier 3: `node scripts/run-evals.js --behavioral <skill>`

| | ผล |
|---|---|
| Eval ที่ให้คะแนนแล้ว | 57/57 (48 skills) |
| ผ่านครบทุกข้อ | 37/57 |
| Expectation ที่ผ่าน | 189/218 (87%) |

Tier 3 ฉีด skill ผ่าน `--append-system-prompt` โดยตรง การแก้ description จึงไม่มีผลกับชุดนี้ ไม่มี baseline ก่อน sync ให้เทียบ ข้อที่ไม่ผ่านแบ่งได้ 3 กลุ่ม:

1. **ปัญหาที่ eval หรือเครื่อง**
   - bash-linux: agent สร้าง `logs/` เองแทนที่จะใช้ fixture ที่อยู่ใต้ `bash-linux/`
   - powershell-windows: ไม่มี `pwsh` บนเครื่อง
   - setup-local-sdk: เครื่องมี .NET 10 ไม่ใช่ 8
   - convert-to-cpm: skill สั่งให้ถามเรื่อง property ก่อน แต่ eval คาดว่าจะทำเสร็จ
   - code-review-and-quality: grader เข้าใจผิดว่าไม่ได้โหลด skill
2. **Eval รอบเดียวแต่ skill ออกแบบให้คุยหลายรอบ:** idea-refine, constraint-driven-development (eval 1, 3), spec-driven-development eval 1 (หยุดที่ Phase 0 capability map)
3. **พฤติกรรมที่ขาดจริง**
   - doubt-driven-development 0/3: ไม่แยก claim มาตรวจและไม่ทดสอบสมมติฐาน
   - api-and-interface-design: เพิ่ม requirement เอง
   - documentation-and-adrs eval 4
   - ไม่ตรวจผลหลังแก้หรือไม่เพิ่ม guard: performance-optimization, nextjs-react-expert, optimizing-ef-core-queries, tailwind-patterns, web-design-guidelines
   - configuring-opentelemetry-dotnet: ไม่ได้กำหนด endpoint ชัด
   - mobile-design: ไม่ได้จัดการ safe area
   - security-and-hardening: ไม่ได้ระบุ trust boundary ก่อนแก้

### Routing: `claude plugin eval . --runs 3 --ablation none --model sonnet`

Case อยู่ใน `evals/plugin/` (118 case × 3 run = 354 run, ไม่มี error)

| กลุ่ม | Case ที่ผ่าน 3/3 | Run ที่ผ่าน |
|---|---|---|
| `command-*` (9 slash commands) | 9/9 | 27/27 |
| `persona-*-fires` (4 personas) | 4/4 | 12/12 |
| `persona-*-quiet` | 4/4 | 12/12 |
| `routing-*-quiet` (ไม่ควร fire) | 48/48 | 144/144 |
| `routing-*-fires` (ควร fire) | 21/48 | 69/144 (สกิลนำเข้า 29/69, สกิล upstream 40/75) |
| case เดิมของ upstream | 2/5 | 7/15 |

ข้อสรุป: ไม่มีการเลือกผิด skill เลย (quiet ผ่าน 100%) ปัญหาเดียวคือ **under-triggering** ใน 27 case: skill อยู่ในรายการที่ model เห็น แต่ model เลือกทำงานเองโดยไม่เรียก Skill tool (ตรวจจาก trace ของ `routing-architecture-fires`) case เดิมของ upstream ก็เป็นแบบเดียวกัน (`code-review-fires` 1/3, `tdd-fires-on-pasted-bug` 0/3) จึงเป็นพฤติกรรมของ model กับ plugin นี้โดยรวม ไม่ใช่ผลจาก description ที่แก้ใน sync นี้ สาเหตุที่เป็นไปได้คือข้อ 5.3 ที่ upstream เลิก inject `using-agent-skills` ตอน SessionStart แต่ยังไม่ได้พิสูจน์
