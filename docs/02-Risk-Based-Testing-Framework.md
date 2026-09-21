# Risk-Based Testing Framework

**Document Version**: 1.0  
**Classification**: Client Deliverable / Supporting Playbook  
**Author**: Dhaval B. Desai – Automation Architect / QA Manager  
**Last Updated**: September 2026  
**Related Document**: 01-Test-Strategy-Playbook.md

---

## 1. Purpose

This framework provides a structured, repeatable approach to identifying, assessing, prioritizing, and mitigating risks related to quality. It ensures that testing effort is focused on the areas of highest business and technical risk, maximizing the value of limited testing resources.

This document is designed as a formal consulting deliverable and can be tailored per engagement.

---

## 2. Objectives of Risk-Based Testing

- Align testing effort with business criticality and technical complexity
- Identify high-risk areas early so mitigation can be planned
- Provide transparent justification for test coverage decisions
- Support informed go/no-go decisions based on residual risk
- Enable continuous re-assessment as the program evolves

---

## 3. Risk Assessment Process

### 3.1 Steps

1. **Identify** risks (business, technical, process, environmental, data, regulatory)
2. **Assess** likelihood and impact
3. **Prioritize** using a risk score
4. **Plan** mitigation and test coverage
5. **Monitor** and re-assess throughout the lifecycle
6. **Report** residual risk at quality gates

### 3.2 Risk Categories (Typical)

| Category              | Examples                                              |
|-----------------------|-------------------------------------------------------|
| Business              | Critical customer journeys, revenue impact, regulatory |
| Technical             | Complex integrations, new technology, performance     |
| Data                  | Migration accuracy, data volume, sensitive data       |
| Process / Change      | High change volatility, late requirements             |
| Environment           | Environment instability, limited test data            |
| Third-party / Vendor  | Dependency on external systems or SI delivery         |
| Compliance / Security | Audit, privacy, accessibility requirements            |

---

## 4. Risk Scoring Model

### 4.1 Likelihood Scale

| Score | Likelihood     | Description                                      |
|-------|----------------|--------------------------------------------------|
| 1     | Rare           | Unlikely to occur under normal conditions        |
| 2     | Unlikely       | May occur in exceptional circumstances           |
| 3     | Possible       | Could occur at some point                        |
| 4     | Likely         | Will probably occur in most circumstances        |
| 5     | Almost Certain | Expected to occur frequently or is already known |

### 4.2 Impact Scale

| Score | Impact     | Description                                                      |
|-------|------------|------------------------------------------------------------------|
| 1     | Insignificant | Minimal or no business impact; cosmetic                          |
| 2     | Minor      | Limited impact; workaround easily available                      |
| 3     | Moderate   | Noticeable impact on process or users; workaround exists         |
| 4     | Major      | Significant business or customer impact; difficult workaround    |
| 5     | Severe     | Critical business process failure, data loss, regulatory breach, or complete blockage |

### 4.3 Risk Score

**Risk Score = Likelihood × Impact**

| Score Range | Risk Level   | Recommended Testing Focus                          |
|-------------|--------------|----------------------------------------------------|
| 1 – 4       | Low          | Minimal / sample testing                           |
| 5 – 9       | Medium       | Standard coverage                                  |
| 10 – 15     | High         | Enhanced coverage + early testing                  |
| 16 – 25     | Critical     | Maximum coverage, shift-left, continuous monitoring|

---

## 5. Risk Assessment Matrix (Template)

| Risk ID | Description                          | Category     | Likelihood | Impact | Score | Risk Level | Mitigation / Test Approach                  | Owner          | Status |
|---------|--------------------------------------|--------------|------------|--------|-------|------------|---------------------------------------------|----------------|--------|
| R-001   | Failure of core payment journey      | Business     | 4          | 5      | 20    | Critical   | Full E2E + automation + early SIT focus     | Test Manager   | Open   |
| R-002   | Data migration reconciliation errors | Data         | 3          | 5      | 15    | High       | Dedicated reconciliation suite + sampling   | Data Lead      | Open   |
| R-003   | Performance degradation under load   | Technical    | 3          | 4      | 12    | High       | Performance testing in scope                | Perf Lead      | Open   |
| R-004   | Late UI changes impacting automation | Process      | 4          | 3      | 12    | High       | Modular automation + frequent regression    | Automation Lead| Open   |
| ...     |                                      |              |            |        |       |            |                                             |                |        |

*Maintain this matrix as a living artifact. Review at each major planning point and quality gate.*

---

## 6. Applying Risk Scores to Test Design

| Risk Level | Test Design Guidance                                                                 |
|------------|--------------------------------------------------------------------------------------|
| Critical   | Exhaustive coverage of happy path + negative + boundary + integration points. Early automation. Continuous monitoring. |
| High       | Strong coverage of main flows + key alternatives + interfaces. Prioritize for automation. |
| Medium     | Standard functional coverage based on requirements. Selective automation.            |
| Low        | Sample testing / exploratory. Low automation priority.                               |

Additional techniques for higher risk areas:
- Pairwise / combinatorial testing where multiple parameters interact
- State transition testing for complex workflows
- Decision table testing for business rules
- Increased exploratory sessions

---

## 7. Residual Risk and Quality Gates

At each quality gate (SIT Exit, UAT Exit, Go-Live):

1. Update the Risk Assessment Matrix with current status
2. Calculate residual risk (open Critical/High items)
3. Document accepted residual risks with rationale and compensating controls
4. Present residual risk clearly in the Test Summary / Quality Gate report
5. Obtain formal acceptance from Business and Program leadership where residual risk remains

---

## 8. Governance

- Risk assessment is owned by the Test Manager / QA Lead
- Input required from Business, Architecture, Development, and Vendors
- Matrix reviewed in Test Working Group and at Quality Gate reviews
- Significant new risks escalated immediately

---

## 9. Tailoring Notes

- Adjust Likelihood/Impact scales if the client already has a corporate risk framework
- Add or remove risk categories based on domain (e.g., clinical risk for healthcare, settlement risk for payments)
- For Agile deliveries, maintain a lightweight risk register and review every 1–2 sprints
- Link high-risk items directly to test cases in the RTM for full traceability

---

**End of Document**
