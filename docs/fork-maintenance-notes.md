# บันทึกการดูแล fork: sync upstream v0.6.13, eval และการปรับปรุง (ตุลาคม 2026)

บันทึกนี้เก็บไว้ว่าทำอะไรไปบ้าง ตัดสินใจอะไรและเพราะอะไร และเหลืองานอะไร ตัวเลขผล eval แบบละเอียดอยู่ใน [evaluation-report.md](evaluation-report.md) ข้อ 5–7

## 1. สถานะล่าสุด (2026-10-24)

- **Branch:** `sync/upstream-0.6.13` แยกจาก `main` ซึ่งยังไม่ได้แตะ
- **Push:** ยังไม่ได้ push ขึ้น remote เลย คนดูแล repo เป็นคน merge และ push เอง
- **Commit แล้ว:** merge upstream (`cde9a10`) จนถึง `a13e165` ซึ่งบันทึกผล eval
- **ยังไม่ commit:** การแก้ skill ของวันที่ 2026-10-24 (13 ไฟล์ใน `skills/` และ `references/definition-of-done.md`) ข้อ 7 ของ `evaluation-report.md` และไฟล์นี้
- **Plugin:** ปิด plugin แบบ user scope ทั้งสองตัวไว้ตอนรัน plugin eval ต้องเปิดกลับเอง (ดูข้อ 7)

## 2. ลำดับงาน

| วันที่ | งาน | ผล |
|---|---|---|
| 2026-10-22 | ประเมินความเสี่ยง แล้ว merge `addyosmani/agent-skills` v0.6.13 | ผ่าน CI ชุดใหม่ของ upstream ทั้งหมด (`evaluation-report.md` ข้อ 5) |
| 2026-10-22 | ให้ behavioral eval ของสกิลนำเข้ามี fixture จริง (`3d56cf0`) และปรับ description ของสกิลนำเข้า 18 ตัว (`942536b`) | `run-evals.js` ผ่าน 100% |
| 2026-10-22 | ดึง reference ต้นฉบับของ `convert-to-cpm` จาก `dotnet/skills` เฉพาะไฟล์ที่ใช้ (`6194551`) | ลิงก์ reference ผ่าน |
| 2026-10-23 | รัน Tier 3 ทุกสกิล และสร้าง routing case ของ `claude plugin eval` สำหรับ skill, persona และ command (`07753cd`) | Tier 3 ผ่าน 189/218 ข้อ และ routing 354 run (`a13e165`, ข้อ 6) |
| 2026-10-24 | แก้ skill ที่ขาดพฤติกรรม และปรับ description ของสกิลนำเข้า 9 ตัว | 6 skill ที่แก้ผ่าน 21/23 ข้อ จากเดิม 15/23 หลังแก้รอบสองผ่าน 22/23 (ข้อ 7) |

## 3. วิธีรัน eval ซ้ำ

**ชุดเช็คของ CI ไม่ใช้ LLM รันได้ทุกครั้งที่แก้** ดูรายการเต็มใน `.github/workflows/test-plugin-install.yml`:

```bash
node scripts/validate-skills.js && node scripts/run-evals.js --min-rank1 95 && node scripts/validate-reference-links.js && node scripts/validate-commands.js
```

**Tier 3 ใช้ LLM ให้คะแนนพฤติกรรมทีละ skill** ผลอยู่ที่ `evals/results/<skill>.eval-N.grading.json` ซึ่ง gitignore ไว้:

```bash
ANTHROPIC_MODEL=sonnet node scripts/run-evals.js --behavioral <skill>
```

**Routing ผ่าน plugin eval ใช้ LLM** ตรวจว่า skill, persona และ command ถูกเรียกจริงไหม case อยู่ใน `evals/plugin/`:

```bash
claude plugin eval . --case <case-name> --runs 3 -j 3 --ablation none --model sonnet --no-publish --trust-plugin --json results.json
```

สิ่งที่เจอระหว่างรัน:
- **ปิด plugin แบบ user scope ก่อนรัน plugin eval** ไม่อย่างนั้นสกิลชื่อเดียวกันจะซ้อนกัน แล้วเปิดกลับหลังรันเสร็จ
- **ชื่อไฟล์ของ `--json` ต้องลงท้ายด้วย `.json`** ชื่ออย่าง `out.json.tmp` จะถูกปฏิเสธ
- **โควตาหมดระหว่างรันได้** ควรเขียน driver ให้ข้ามงานที่เสร็จแล้ว และหยุดทันทีเมื่อเจอข้อความ `hit your limit` หรือ `429` รอบแรกควรรัน 1 run ต่อ case ให้ครบก่อน แล้วค่อยเพิ่ม run ภายหลัง driver ของรอบนี้อยู่ใน scratchpad ซึ่งลบไปแล้ว
- **IDE สร้าง `obj/` กับ `bin/` ใน `evals/fixtures/` ของ .NET ขึ้นมาใหม่เรื่อยๆ** และ Tier 3 จะ copy ไปด้วย ให้ลบก่อนรัน
- **grader บางครั้งเขียน JSON ผิดรูป** ผลจะไปอยู่ใน `.grading.raw.txt` แทน รอบนี้แก้ด้วยมือ 2 ไฟล์
- **อย่ารัน `node --test` เปล่าๆ** เพราะจะเจอ test ที่ upstream ตั้งใจให้ fail ใน fixture ของ debugging 1 ตัว ให้รันเฉพาะไฟล์ test ที่ CI ระบุ
- **`run-evals.js` ให้คะแนนจากคำที่ตรงกัน** คำใหม่ใน description อาจดึง prompt ของสกิลอื่นไป ต้องรันซ้ำทุกครั้งที่แก้ description
- **Tier 3 รันครั้งเดียวผลแกว่งได้** อย่าไล่แก้ skill จนผ่าน 100% ในรอบเดียว เพราะจะได้ skill ที่ตรงกับข้อสอบแทนที่จะดีขึ้นจริง

## 4. การแก้ skill ตามผล eval (2026-10-24)

**ทำไม doubt-driven-development ได้ 0/3:** agent ทำตาม skill ทุกขั้น แต่ตัว skill เองพาไปจุดที่ไม่ผ่าน
- Step 2 สั่ง "Strip your reasoning" agent จึงตัดข้อกล่าวอ้างในแผนทิ้งไปด้วย
- skill บังคับให้ถามเรื่อง cross-model ก่อน RECONCILE run จึงจบที่คำถามโดยยังไม่มีผลสรุป

ที่แก้:
- ข้อกล่าวอ้างในแผนนับเป็นส่วนของ artifact
- ต้องทดสอบด้วย tool อย่างน้อย 1 ข้อก่อนจัดประเภท
- สรุปเป็นตาราง verified / refuted / surviving doubt
- ให้ผลสรุปเบื้องต้นก่อนถามเรื่อง cross-model
- เพิ่ม Red Flags 2 ข้อ และ Verification 2 ข้อ

**กลุ่มที่แก้แล้วไม่ตรวจผลต่อ:** ทุกตัวไม่ผ่านแบบเดียวกัน คือ agent บอกว่า "ยังไม่ได้รัน X" แล้วจบงาน จึงเพิ่มกฎกลาง "Checks You Could Not Run" ใน `references/definition-of-done.md` แทนการเขียนซ้ำในทุก skill ตาม Boundaries ของ `CLAUDE.md`

| Skill | แก้อะไร |
|---|---|
| performance-optimization | เพิ่มใน Step 5 ว่าไม่มี CI ก็ต้องเขียน guard เป็น test หรือ script ไว้ใน repo |
| nextjs-react-expert | ต้องระบุคอขวดพร้อมตัวเลขก่อนแก้โค้ด และวัดผลก่อนและหลังด้วย React Profiler หรือ INP/LCP |
| optimizing-ef-core-queries | ต้องดู SQL ด้วย `ToQueryString()` หรือ `LogTo` และบอกจำนวน query ก่อนและหลัง |
| tailwind-patterns | เพิ่ม `## 13. Verification`: รัน CSS build, ห้ามประกอบชื่อ class จาก template string, เช็คที่ 375px และ ≥1024px |
| web-design-guidelines | เพิ่ม `## Verification`: ระบุปัญหาเป็น `file:line`, ทดสอบด้วยคีย์บอร์ด, ตรวจ error ของฟอร์ม (`aria-invalid`, `aria-describedby`, live region) และรัน axe หรือ Lighthouse |

**Description ของสกิลนำเข้า 9 ตัว:** python-patterns, web-design-guidelines, tailwind-patterns, nextjs-react-expert, powershell-windows, lint-and-validate, i18n-localization, documentation-templates และ batch-operations
- สูตรที่ใช้คือใส่ชื่อเทคโนโลยี, ไฟล์หรือ syntax ที่เห็นแล้วรู้ว่าเกี่ยว และคำที่ผู้ใช้มักพูดจริง
- ที่มาของสูตร: สกิลนำเข้าที่ผูกกับเทคโนโลยีเฉพาะผ่าน fire case 3/3 เช่น EF Core, dotnet-webapi, binlog ส่วนสกิลที่ description กว้างได้ 0/3
- web-design-guidelines กลับไปใช้คำเกือบเหมือนเดิม เพราะคำว่า "accessible" กับ "component" ไปดึง prompt ของ frontend-ui-engineering
- สกิลของ upstream (review, TDD, debugging, performance, security) ไม่ได้แก้ description เพราะเขียนไว้ชัดอยู่แล้วแต่ก็ยังไม่ถูกเรียก และแก้ใน fork จะเกิด conflict ทุกครั้งที่ sync

## 5. ปัญหา skill ไม่ถูกเรียกเอง (under-triggering)

ผลจาก plugin eval:
- slash command และ persona ไปถูกตัวทุกครั้ง
- skill ไม่เคย fire ผิดงานเลย
- แต่ skill ที่ควร fire ถูกเรียกแค่ 69/144 run
- trace แสดงว่า model เห็น skill อยู่ในรายการ แต่เลือกทำงานเองโดยไม่เรียก case เดิมของ upstream ก็เป็นแบบเดียวกัน จึงไม่ได้เกิดจาก description ที่แก้ใน sync นี้
- skill ที่มักไม่ถูกเรียกเป็นงานที่ทำต่อได้เลยจากโค้ดที่แปะมาใน prompt เช่น review, debug, TDD, security

`hooks/session-start.sh` ยังอยู่ใน repo แต่ upstream ไม่ได้ผูกไว้กับ plugin แล้ว เหตุผลที่เขียนไว้คือ Claude Code เลือก skill จาก description ได้เอง ถ้า inject `using-agent-skills` เพิ่มจะกลายเป็นมีตัวเลือก skill สองชั้นซ้อนกัน

ทางแก้ที่พิจารณา:
1. **ใช้ slash command กับ workflow หลัก** (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`) วัดแล้วผ่าน 27/27 run เพราะไฟล์ command สั่ง "Invoke the agent-skills:… skill" ตรงๆ ข้อจำกัดคือ command พาไปได้แค่ skill ของตัวเอง
2. **เพิ่มกฎใน `CLAUDE.md` ของโปรเจกต์ที่ใช้ plugin** เลือกทางนี้ โดยใส่แบบ project scope ไม่ใส่ global เคยลองใส่ global แล้วถอดออก ยังไม่ได้วัดผล เพราะ plugin eval รันใน sandbox ที่น่าจะไม่โหลด CLAUDE.md ของผู้ใช้
3. **เปิด SessionStart hook เฉพาะเครื่อง** ยังไม่ได้ทดลอง ถ้าจะลอง ต้องรัน fire case ทั้ง 48 ตัว เทียบตอนเปิดกับปิด
4. **แก้ description** ได้ผลจำกัด ดูข้อ 4

ข้อความสำหรับ `CLAUDE.md` ของโปรเจกต์:

```markdown
## Agent skills

This project uses the agent-skills plugin. For any task bigger than a one-line edit,
invoke the matching skill with the Skill tool before reading or editing code,
even when the code is pasted in the message and the fix looks obvious.

- Reviewing a diff or PR → code-review-and-quality
- Bug, failing test, unexpected error → debugging-and-error-recovery, then test-driven-development (failing test first)
- Refactor or clean-up without behavior change → code-simplification
- Slow page, endpoint or query → performance-optimization (EF Core → optimizing-ef-core-queries)
- User input, auth, secrets, third-party data → security-and-hardening
- CI pipelines → ci-cd-and-automation; releasing → shipping-and-launch
- UI work → frontend-ui-engineering (Tailwind → tailwind-patterns, Next.js → nextjs-react-expert, accessibility → web-design-guidelines)

If no skill fits, say so in one line and continue.
```

## 6. การสร้าง agent หรือ pipeline ที่เรียกต่อกันเอง

ข้อจำกัดของ Claude Code ดูเพิ่มใน [orchestration-patterns.md](../references/orchestration-patterns.md):

| อยากให้ทำ | ได้ไหม |
|---|---|
| session หลักเรียก skill หรือ command ต่อกันหลายตัว | ได้ |
| session หลักส่งงานให้ sub agent หลายตัวพร้อมกัน (แบบ `/ship`) | ได้ ต้องเรียก Agent tool ทุกตัวใน turn เดียว |
| sub agent ใช้ skill | ได้ ผ่าน field `skills:` ใน frontmatter ของ agent |
| sub agent เรียก sub agent ต่อ | ไม่ได้ ("Subagents cannot spawn other subagents") |

`orchestration-patterns.md` กำหนดแบบที่ไม่ควรทำไว้:
- **A:** agent ที่มีหน้าที่แค่เลือกว่าจะส่งงานให้ agent ไหน
- **B:** persona ที่เรียก persona อื่นต่อ
- **C:** agent ที่รัน `/spec` ต่อ `/plan` ต่อ `/build` เองโดยไม่หยุดถามคน
- **D:** persona ซ้อนกันหลายชั้น

ทำใน fork ได้ แต่ upstream ไม่น่าจะรับ

**แนวทางที่เลือก:** ใช้ bash เป็นตัวคุมลำดับ แต่ละขั้นเป็น `claude -p` ใน session ใหม่ ขั้นต่างๆ ส่งงานต่อกันผ่านไฟล์ (`SPEC.md`, `tasks/plan.md`, `tasks/todo.md`, git commit) และหยุดให้คนตรวจ 3 จุด วิธีนี้ไม่ตรงกับแบบ C เพราะไม่มี LLM ตัวกลางมาสรุปข้อมูลต่อ ถ้าไม่ต้องการแยก session ต่อ task ใช้ `/agent-skills:build auto` ได้ ขอ approve ครั้งเดียว แต่ context จะยาวขึ้นเรื่อยๆ

ตัวอย่าง script ซึ่ง **ยังไม่ได้ทดสอบ** ให้ลองกับโปรเจกต์เล็กก่อน ปรับ `ALLOW` ตาม stack และเปิด plugin ไว้แค่ตัวเดียว เพราะทั้งสองตัวมี `/agent-skills:*` ชื่อซ้ำกัน:

```bash
#!/usr/bin/env bash
# agent-pipeline.sh "<what to build>"
# spec → plan → build (one task per session) → review → ship.
# Run from the target project's root. Steps share state through files and git, not context.
set -euo pipefail
IDEA=${1:?usage: agent-pipeline.sh "<what to build>"}
MODEL=${MODEL:-sonnet}
MAX_TASKS=${MAX_TASKS:-30}
# Tools a headless step may use without asking. Adjust the Bash entries to your stack.
ALLOW="Read,Edit,Write,Glob,Grep,Skill,Agent,Bash(git:*),Bash(npm:*),Bash(npx:*)"

step()  { printf '\n== %s\n' "$1"; }
run()   { claude -p "$1" --model "$MODEL" --permission-mode acceptEdits --allowedTools "$ALLOW"; }
pause() { read -r -p "$1 Enter = continue, Ctrl-C = stop. " _; }
open_tasks() { awk '/^[[:space:]]*- \[ \]/{n++} END{print n+0}' tasks/todo.md 2>/dev/null || echo 0; }

step "1/5 spec (interactive: answer its questions, then /exit)"
claude --model "$MODEL" "/agent-skills:spec $IDEA"
[ -f SPEC.md ] || { echo "SPEC.md was not written; stopping."; exit 1; }

step "2/5 plan"
run "/agent-skills:plan Non-interactive run: skip plan mode and approval, write tasks/plan.md and tasks/todo.md from SPEC.md, then exit. A human reviews the files afterwards."
pause "Review tasks/plan.md and tasks/todo.md."

step "3/5 build, one fresh session per task"
for _ in $(seq 1 "$MAX_TASKS"); do
  before=$(open_tasks); [ "$before" -eq 0 ] && break
  run "/agent-skills:build"
  after=$(open_tasks)
  [ "$after" -lt "$before" ] || { echo "No task completed in that session; stopping for a human."; exit 1; }
  [ -z "$(git status --porcelain -- . ':!tasks')" ] || { echo "Uncommitted changes left behind; stopping."; exit 1; }
done

step "4/5 review"
run "/agent-skills:review" | tee tasks/review.md
pause "Read tasks/review.md and fix Critical/Required findings first."

step "5/5 ship (pre-launch go/no-go only; it does not deploy)"
run "/agent-skills:ship" | tee tasks/ship.md
```

**ถ้าเพิ่ม agent หรือ command ใหม่ ไม่ต้อง eval ใหม่ทั้งหมด** วัดเฉพาะส่วนที่เปลี่ยน:
- **เพิ่ม command หรือ agent:** รัน `validate-commands.js` กับ `validate-skills.js` แล้วเพิ่ม plugin-eval case ของตัวใหม่ ทั้ง case ที่ต้องเรียกและ case ที่ไม่ควรเรียก
- **แก้ description:** รัน `run-evals.js`
- **แก้เนื้อหา skill:** รัน Tier 3 เฉพาะ skill นั้น
- **ข้อจำกัด:** grader แบบ `tool_used` ตรวจได้แค่ว่าแต่ละตัวถูกเรียก ตรวจลำดับการเรียกไม่ได้

## 7. งานค้าง

ต้องทำ:
- [ ] เปิด plugin กลับ: `claude plugin enable agent-skills@addy-agent-skills --scope user && claude plugin enable agent-skills@hrmapp-agent-skills --scope user`
- [ ] Commit การแก้ของวันที่ 2026-10-24
- [ ] ตัดสินใจ merge `sync/upstream-0.6.13` เข้า `main` แล้ว push เอง
- [ ] ก่อน push ขึ้น public ตัดสินใจว่าจะเอาชื่อผู้ใช้ "nack" ออกจาก `evals/fixtures/binlog-failure-analysis/build.binlog` ไหม

รอตัดสินใจ:
- [ ] ลบคำว่า "ecosystem files" ออกจาก description ของ server-management ไหม
- [ ] ลบ `ToQueryString` ออกจาก description ของ optimizing-ef-core-queries ไหม ส่วน body ใช้คำนี้ต่อ

ทำเมื่อมีโควตา:
- [x] วัด Tier 3 ซ้ำของ nextjs-react-expert กับ web-design-guidelines หลังแก้รอบที่สอง ได้ 3/4 และ 4/4 (`evaluation-report.md` ข้อ 7)
- [ ] nextjs-react-expert: ถ้าจะให้ผ่าน ให้เปลี่ยนกฎใน Phase 1 เป็น "เขียนคอขวดลงในข้อความก่อนแก้ไฟล์แรก" แล้ววัดซ้ำ ระวังแก้จนตรงกับข้อสอบ
- [ ] ส่งการแก้ doubt-driven-development, performance-optimization และ `references/definition-of-done.md` เป็น PR ไปที่ upstream เพื่อลด conflict ตอน sync ครั้งหน้า ก่อนส่งให้เช็ค PR และ issue ที่เปิดอยู่ตาม `CLAUDE.md`
- [ ] แก้ eval ที่พังเพราะเครื่องหรือการออกแบบ eval:
  - bash-linux ใช้ path ของ fixture ผิด
  - prompt ของ convert-to-cpm ขัดกับ skill ที่สั่งให้ถามก่อน
  - powershell-windows ต้องมี `pwsh`
  - setup-local-sdk คาดว่าเครื่องมี .NET 8
- [ ] ทดลองว่า SessionStart hook ช่วยเรื่อง under-triggering ได้จริงไหม
- [ ] ใส่ข้อความในข้อ 5 ลงใน `CLAUDE.md` ของโปรเจกต์ที่ใช้ plugin
