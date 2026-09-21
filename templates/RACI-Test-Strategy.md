# RACI Matrix – Test Strategy & Delivery

**Engagement**: [Program / Project Name]  
**Version**: 1.0  
**Last Updated**: September 2026

---

## How to Use
- R = Responsible (does the work)
- A = Accountable (final decision / ownership)
- C = Consulted (provides input)
- I = Informed (kept up to date)

Customize roles and activities per engagement.

---

## Core RACI

| Activity / Deliverable                          | Program Manager | Business Owner | Test Manager / QA Lead | Test Lead / Coordinator | Automation Lead | Dev Lead | Vendor / SI | Release Manager |
|-------------------------------------------------|-----------------|----------------|------------------------|--------------------------|-----------------|----------|-------------|-----------------|
| Define overall Test Strategy                    | C               | C              | A / R                  | C                        | C               | C        | C           | I               |
| Approve Test Strategy                           | A               | A              | R                      | I                        | I               | I        | I           | I               |
| Detailed Test Planning & Schedule               | C               | C              | A                      | R                        | C               | C        | C           | C               |
| Requirements Traceability (RTM)                 | I               | C              | A                      | R                        | C               | C        | C           | I               |
| Test Case Design & Review                       | I               | C              | A                      | R                        | C               | C        | C           | I               |
| Test Data Preparation                           | I               | C              | A                      | R                        | C               | C        | R           | I               |
| Environment Readiness                           | C               | I              | A                      | R                        | C               | R        | R           | C               |
| SIT Execution                                   | I               | I              | A                      | R                        | C               | C        | C           | I               |
| UAT Coordination & Support                      | C               | A              | R                      | R                        | I               | I        | I           | I               |
| Automation Framework & Development              | I               | I              | A                      | C                        | R               | C        | C           | I               |
| CI/CD Quality Gates                             | I               | I              | A                      | C                        | R               | C        | C           | C               |
| Defect Triage & Management                      | C               | C              | A                      | R                        | C               | R        | R           | I               |
| Daily / Weekly Status Reporting                 | I               | I              | A / R                  | R                        | C               | I        | I           | I               |
| Quality Gate / Entry-Exit Assessment            | C               | C              | A / R                  | C                        | C               | C        | C           | C               |
| Go / No-Go Recommendation                       | A               | A              | R                      | C                        | C               | C        | C           | C               |
| Production Validation / Hypercare               | C               | A              | R                      | R                        | C               | C        | C           | A               |
| Knowledge Transfer & Handover                   | C               | C              | A                      | R                        | R               | C        | R           | I               |

---

## Notes
- One Accountable (A) per activity is preferred.
- Adjust columns for additional roles (e.g., Security, Performance, Data Migration Lead).
- Review and baseline this matrix at the start of the engagement.
