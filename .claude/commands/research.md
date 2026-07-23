# /research Command

> **📚 CONTEXT7 INTEGRATION**: Context7 requires a two-step process but implementation varies by environment:
>
> **For Claude Desktop/API (MCP):**
>
> 1. **ALWAYS** use `context7:resolve-library-id` with package name first
> 2. **THEN** use `context7:get-library-docs` with exact resolved ID
>
> **For VS Code/GitHub Copilot (Wrapper Script):**
>
> 1. **ALWAYS** use `./scripts/context7.sh resolve <library-name>` first
> 2. **THEN** use `./scripts/context7.sh docs <library-id> [topic] [tokens]` with exact resolved ID
>
> **NEVER** guess or construct Context7 library IDs in either environment.

## Purpose

Generate pure research analysis through automated external research. Focuses on technology discovery and evaluation without examining existing codebase.

**Output**: 4 research documents in session-isolated directory following standard research format  
**Focus**: Technology research, framework evaluation, and best practices - NOT code or existing architecture  
**Total Time**: 15-20 minutes, fully automated
**Isolation**: Each execution creates unique session to support concurrent research

Use sequential thinking and ultrathink.

## Session Setup

**Session ID Generation**: Generate unique session ID using `python3 -c "import uuid; print(uuid.uuid4().hex[:8])"` immediately at start for use throughout all phases. This ensures true uniqueness to prevent conflicts with existing session directories.

**Session Directory**: Create `research_sessions/[session_id]_[date]/` structure with:

- `session_process.md` - Process documentation and reasoning
- `sources/context7/` - Context7 research materials
- `sources/web/` - Web research materials
- Research documents, ADR, and navigation files

## Phase 1: Challenge & Research (10-13 minutes)

#### Step 1: Challenge Analysis & Problem Anchoring

Apply three-option framework, conduct critical reflection, then create robust problem statement:

**Three-Option Analysis**:

- **What You Asked For** (literal interpretation)
- **What Actually Achieves Your Goal** (tool-first with existing frameworks)
- **What You Should Be Asking** (complete reframe: "Your approach is wrong")

**Free-Flowing Reflection**: Conduct thoughtful reflection with genuine curiosity before selecting direction:

- What feels "off" about the proposed solutions? Share observations with care and nuance
- Are there layers of complexity worth acknowledging that haven't been addressed?
- What concerns or doubts arise when considering the long-term implications?
- What patterns or trends suggest different approaches?
- Where might the user's original assumptions be incomplete or misguided?
- What blind spots or unstated assumptions need exploration?

**Reflection Approach**: Think like a trusted mentor who helps identify blind spots because they want the project to succeed. Lead with understanding before moving into concerns. Frame observations in a way that shows full consideration of the picture while staying grounded in reality.

**Problem Anchoring**: After reflection and analysis, reformulate the user's request as a robust, comprehensive prompt that:

- Captures the **fundamental problem** they're trying to solve (informed by reflection insights)
- Removes ambiguity from their original request
- Reframes through the lens of the highest-scoring option
- Creates a clear architectural challenge statement
- Incorporates blind spots and concerns identified during reflection

**Auto-Selection Scoring**:

- Tool Availability (40%), Best Practice Alignment (30%), Research Depth (20%), Simplicity (10%)
- Default to Option 2 if tied
- Document selection rationale including reflection insights

**Domain Identification**: After problem anchoring, identify 3-5 natural research domains that emerge from the reformulated problem:

- Domains should be organic to the problem (not forced into predefined categories)
- Examples: "Authentication vs Authorization", "Real-time vs Batch Processing", "Monolith vs Microservices", "Data Consistency vs Performance"
- Ensure domains are diverse and cover different aspects of the architectural challenge
- Each domain should represent a distinct architectural concern requiring research

**Output**:

- Auto-selected challenge direction with scoring rationale
- Critical reflection insights on potential blind spots and assumptions
- Reformulated problem statement that anchors all subsequent research
- 3-5 identified research domains based on the architectural challenge
- Clear research plan ready for execution

**Process Documentation**: Update `session_process.md` with challenge analysis, three-option reasoning, and problem reformulation

**Core Principle**: "Less code is better code" - leverage existing frameworks for elegant solutions.

#### Step 2: Pure External Research Execution

Execute simultaneously using the anchored problem statement:

**Context7 (Priority Research - 6-8 minutes)**:

- **Environment Detection**:
  - **Claude Desktop/API**: Use MCP tools `context7:resolve-library-id` and `context7:get-library-docs`
  - **VS Code/GitHub Copilot**: Use wrapper script `./scripts/context7.sh resolve` and `./scripts/context7.sh docs`
- **Server Readiness**:
  - **Claude**: Quick `claude mcp list | grep context7` check + auto-restart if needed
  - **VS Code**: Verify wrapper script exists and is executable (`chmod +x scripts/context7.sh`)
- **Discovery Phase**: Resolve library IDs for each architectural domain with broad terms
  - Frontend: "react state management", "typescript validation", "vue composition"
  - Backend: "node.js frameworks", "python fastapi", "go web servers"
  - Database: "postgresql patterns", "mongodb optimization", "redis caching"
  - Infrastructure: "docker deployment", "kubernetes scaling", "terraform patterns"
  - **Claude Example**: `context7:resolve-library-id("react state management")`
  - **VS Code Example**: `./scripts/context7.sh resolve "react state management"`
  - **SAVE IMMEDIATELY**: Write each resolve result to `discovery_[domain]_[timestamp].json`
- **Deep Research**: Get library documentation with 8000-token budget for top libraries
  - Focus topics: "best practices", "performance patterns", "architecture examples", "common pitfalls"
  - Trust score ≥8 priority, snippet count ≥100 preferred
  - **Claude Example**: `context7:get-library-docs("/context7/react_dev", "best practices", 8000)`
  - **VS Code Example**: `./scripts/context7.sh docs "/context7/react_dev" "best practices" 8000`
  - **SAVE IMMEDIATELY**: Write each docs result to `library_[resolved_id]_[topic]_[timestamp].md`
- **Error Handling**:
  - **Claude**: If Context7 MCP fails, attempt server restart sequence
  - **VS Code**: If wrapper script fails, check Context7 server status with `npx -y @upstash/context7-mcp --help`
  - If still failing, pause research and prompt user to fix Context7 before continuing

**Web Research (Supplementary - 2-4 minutes)**: Best practices and framework comparisons aligned with reformulated problem, focusing on Context7 validation and gap-filling

- **SAVE IMMEDIATELY**: Write each WebSearch result to `search_[query_hash]_[timestamp].md`
- **SAVE IMMEDIATELY**: Write each WebFetch result to `fetched_[domain]_[page_title]_[timestamp].md`

**Research Focus**: Use the reformulated problem statement to guide all external research efforts, ensuring alignment with the fundamental issue. NO codebase analysis or existing project examination.

**Source Material Capture**: **IMMEDIATELY SAVE** all raw source materials with comprehensive research context to organized folders as they are discovered:

- Context7 responses → `research_sessions/[session_id]_[date]/sources/context7/`
- Web search results → `research_sessions/[session_id]_[date]/sources/web/`
- WebFetch content → `research_sessions/[session_id]_[date]/sources/web/`

**CRITICAL**: Write source files to disk IMMEDIATELY upon receiving each research result with complete context headers - do not batch or delay source preservation.

**Enhanced Source File Format**:
Each source file must include research context header for effective resumption:

```markdown
# Research Context Header

- **Research Domain**: [Which identified domain this addresses]
- **Query Intent**: [Specific research question being answered]
- **Discovery Path**: [How we arrived at this source - search terms, library resolution]
- **Evaluation Notes**: [Initial assessment and key insights]
- **Related Sources**: [Cross-references to other relevant sources]
- **Problem Anchor**: [Connection to reformulated problem statement]
- **Timestamp**: [When this research was conducted]
- **Session Phase**: [Which research phase this was part of]

# Original Source Content

[Raw Context7/web content here]
```

**Source File Naming**:

- Context7 Discovery: `[domain]_discovery_[timestamp].json` for resolve-library-id results
- Context7 Documentation: `[domain]_library_[resolved_id]_[topic]_[timestamp].md` for detailed docs
- Context7 Synthesis: `[domain]_synthesis_comparison_[timestamp].md` for cross-library analysis
- Web Search: `[domain]_search_[query_hash]_[timestamp].md` for search results
- Web Fetch: `[domain]_fetched_[page_title]_[timestamp].md` for page content

**Process Documentation**: Update `session_process.md` with research approach and key discoveries

**Research Resumption Strategy**: Enhanced source preservation enables effective research resumption:

- **Context Headers**: Allow understanding of research intent and evaluation state
- **Discovery Paths**: Show how conclusions were reached and what led to each source
- **Evaluation Notes**: Preserve analytical insights and initial assessments
- **Cross-References**: Maintain research coherence across related sources
- **Problem Anchoring**: Connect all sources back to the fundamental architectural challenge
- **Session Continuity**: Complete research context enables picking up where previous sessions left off

#### Step 3: Research Synthesis

Consolidate research findings against the anchored problem statement:

- Key technologies discovered that solve the fundamental problem
- Anti-patterns to replace with existing tools
- Problem anticipation and mitigation strategies
- Critical reflection on blind spots and assumptions in original request

**Synthesis Focus**: Ensure all findings directly address the reformulated architectural challenge, not just the user's surface-level request.

**Output**: Complete research synthesis anchored to the core problem, ready for reflection
**Process Documentation**: Update `session_process.md` with synthesis insights and patterns discovered

#### Step 4: Free-Flowing Reflection & Synthesis

Conduct thoughtful reflection on all research findings to synthesize insights before creating ADRs:

**Reflection Process:**

- **Holistic Pattern Recognition**: What overarching patterns emerge across all research sources?
- **Architectural Intuition**: What feels "right" or "off" about the discovered solutions when considered together?
- **Missing Pieces**: What gaps exist between research findings and the real-world architectural challenge?
- **Integration Concerns**: How do the discovered technologies actually work together in practice?
- **Future Considerations**: What long-term implications arise from these architectural choices?
- **Blind Spot Analysis**: What assumptions or constraints haven't been adequately addressed?

**Synthesis Approach:**
Approach this with genuine curiosity and thoughtful consideration. Think like a seasoned architect who has seen many systems succeed and fail. Don't just summarize research - connect dots, identify tensions, and surface nuanced considerations that may not be obvious from individual research sources.

**Key Questions to Explore:**

- How do these technologies solve the fundamental problem differently than expected?
- What trade-offs become apparent when viewing the entire technology stack together?
- Where might implementation complexity hide despite tool promises?
- What operational realities could impact the theoretical architecture?
- How do enterprise constraints shape the practical application of these tools?

**Reflection Focus:**
Stay grounded in the reformulated architectural challenge while allowing intuition and experience to guide deeper insights. This isn't about finding problems - it's about understanding the full landscape before making architectural commitments.

**Output**: Synthesized research insights ready for document generation
**Process Documentation**: Update `session_process.md` with reflection insights and architectural intuition

## Phase 2: Research Document Generation (5-8 minutes)

#### Step 1: Domain-Specific Research Documents

Generate 3-5 research documents based on identified domains from Phase 1, using research synthesis and reflection insights:

**Document Structure** (for each domain):

- **Title**: Clear research topic based on identified domain
- **Context**: Research scope and domain-specific objectives
- **Findings**: Technologies/patterns discovered for this domain
- **Analysis**: Comparative evaluation (research-backed with source citations)
- **Trade-offs**: Benefits and limitations identified
- **Alternatives**: Other options researched
- **Sources**: Complete bibliography with source file links

**Domain Coverage**: Each document covers one distinct architectural concern from Phase 1 identification
**Research Focus**: Pure research analysis, no implementation details or roadmaps
**Source Integration**: Reference preserved source materials in organized folders

#### Step 2: Quality Validation

Automated checks:

- Research document format compliance
- Domain-specific research completeness
- Research rationale depth
- Source citation accuracy
- **Context7 Quality Gates**:
  - Documentation completeness within token budgets
  - Trust score validation (≥8 for production recommendations)
  - Source attribution completeness for all Context7 findings
- **Source Preservation Quality Gates**:
  - All source files have complete context headers
  - Discovery paths are documented for each source
  - Evaluation notes capture key insights and assessments
  - Cross-references properly link related sources
  - Problem anchoring connects sources to architectural challenge
  - Session continuity information enables research resumption

**Output**: 3-5 validated research documents with complete source citations
**Process Documentation**: Update `session_process.md` with document creation approach and validation results

## Phase 3: Integrated ADR Creation (3-5 minutes)

#### Step 1: Comprehensive ADR Document

Create integrated ADR that synthesizes all research documents into coherent architectural decisions, following the standard ADR format from `adr_example_format.md`:

**ADR Structure** (following exact format):

- **Title**: ADR-XXX: [Decision Title]
- **Status**: Proposed/Accepted/Deprecated/Superseded
- **Context**: Problem statement and constraints requiring decisions
- **Decision**: Specific architectural choices made based on research (may include multiple related decisions)
- **Consequences**: Positive, Negative, and Neutral outcomes synthesized from all research

**Research Integration**: Transform research findings into decision-focused content:

- **Context section**: Use anchored problem statement and constraints
- **Decision section**: Select specific technologies/approaches from research findings across domains
- **Consequences section**: Extract trade-offs from research analysis, reference specific research documents

**Multi-Domain Synthesis**: Handle multiple related decisions coherently (e.g., "Use Auth0 for SSO, React for frontend, PostgreSQL for sessions")

#### Step 2: Navigation Document

Create wiki/README-style summary document for research navigation:

**Navigation Structure**:

- **Overview**: Brief summary of research landscape and key findings
- **Research Documents**: Links to all domain research documents with brief summaries
- **Key Insights**: Highlight major discoveries and patterns
- **Source Materials**: Links to preserved source files and research provenance

**Purpose**: Help users navigate and understand the research corpus without implementation details

## Phase 4: Completion (2-3 minutes)

#### Final Steps:

1. Create session directory structure:
   ```
   research_sessions/[session_id]_[date]/
   ├── session_process.md
   ├── sources/
   │   ├── context7/
   │   └── web/
   ├── research_[domain1].md
   ├── research_[domain2].md
   ├── research_[domain3].md
   ├── architecture_decision_record.md
   └── research_navigation.md
   ```
2. Save all documents to session directory with source links
3. Present comprehensive research and ADR results summary

**Deliverables**:

- `research_sessions/[session_id]_[date]/session_process.md` (process documentation)
- `research_sessions/[session_id]_[date]/research_[domain_name].md` (3-5 documents)
- `research_sessions/[session_id]_[date]/architecture_decision_record.md`
- `research_sessions/[session_id]_[date]/research_navigation.md`
- `research_sessions/[session_id]_[date]/sources/context7/[source_files]`
- `research_sessions/[session_id]_[date]/sources/web/[source_files]`

**Process Documentation**: Finalize `session_process.md` with completion summary and final file inventory

## Process Documentation Strategy

The `/research` command preserves analytical work through `session_process.md` for each research session:

**Process Documentation Contents**:

- **Challenge Analysis**: Three-option framework reasoning, scoring rationale, and problem reformulation
- **Research Approach**: Key research decisions, search strategies, and discovery process
- **Source Discovery Log**: Track why each source was researched and what questions it aimed to answer
- **Evaluation Summary**: Key insights and assessments from each source with cross-references
- **Cross-Domain Connections**: How sources relate across domains and reinforce findings
- **Synthesis Insights**: How findings were consolidated and patterns identified
- **Reflection Notes**: Free-flowing architectural intuition and blind spot analysis
- **Document Creation**: Approach to organizing findings into research documents
- **Completion Summary**: Final file inventory and research outcomes with resumption guidance

**Benefits**:

- **Preserved Insights**: Complete analytical thinking saved as narrative documentation
- **Process Transparency**: Clear audit trail of research decisions and reasoning
- **Learning Resource**: Research approaches become queryable knowledge base
- **Session Isolation**: Multiple concurrent research sessions without conflicts
- **Team Knowledge**: Share research reasoning with full context
- **Source Verification**: Raw source materials preserved in organized folders
- **Reproducible Research**: Others can review process and original sources
- **Organized Archive**: Clean separation of process documentation and source materials

## Document Format Guidelines

### Research Document Format

**Structure** (for each domain-specific research document):

- **Title**: Clear research topic based on identified domain
- **Context**: Research scope and domain-specific objectives
- **Findings**: Technologies/patterns discovered for this domain
- **Analysis**: Comparative evaluation (research-backed with source citations)
- **Trade-offs**: Benefits and limitations identified
- **Alternatives**: Other options researched
- **Sources**: Complete bibliography with URLs, titles, authors, dates, and relevant quotes
- **Source Files**: Links to raw source materials in `./sources/` directory

### ADR Document Format

Follow the exact structure from `adr_example_format.md`:

**Required Sections**:

- **Title**: ADR-XXX: [Decision Title]
- **Status**: Proposed/Accepted/Deprecated/Superseded
- **Context**: Problem statement and constraints requiring decisions
- **Decision**: Specific architectural choices made based on research (may include multiple related decisions)
- **Consequences**: Positive, Negative, and Neutral outcomes synthesized from all research

**Research Integration Guidelines**:

- **Context**: Use anchored problem statement, avoid implementation details
- **Decision**: Select specific technologies/approaches from research findings across domains
- **Consequences**: Extract trade-offs from research analysis, reference specific research documents
- **Sources**: Complete bibliography with URLs, titles, authors, dates, and relevant quotes
- **Source Files**: Links to raw source materials in `./sources/` directory

### Navigation Document Format

**Structure** (for research navigation/wiki document):

- **Overview**: Brief summary of research landscape and key findings
- **Research Documents**: Links to all domain research documents with brief summaries
- **Key Insights**: Highlight major discoveries and patterns
- **Source Materials**: Links to preserved source files and research provenance

**Source Linking Example**:

- Citation: `[1] Auth0 Documentation - Enterprise SSO Patterns`
- Source File: `[Raw Source](./sources/context7/library_auth0_enterprise_sso_20250708145623.md)`
- Research Reference: `[See Research Document](./research_authentication_patterns.md)`

**Avoid in All Documents**:

- Implementation roadmaps or timelines
- Detailed configuration examples
- How-to guides or tutorials
- Step-by-step implementation instructions

## Execution Rules

### ✅ DO:

- **AUTOMATE EVERYTHING** - no user interaction
- **CONTEXT7 FIRST** - use MCP before web searches
- **TOOL DISCOVERY** - find existing solutions vs building custom
- **PARALLEL EXECUTION** - research and document generation simultaneously
- **FOCUS ON RESEARCH** - document what exists and evaluation, not implementation decisions
- Use 2025 best practices and standard frameworks
- Target 95%+ configuration-based solutions
- Apply "Your approach is wrong - here are existing tools" principle

### ❌ DON'T:

- Include implementation code in any documents
- Create configuration examples or how-to guides
- Add implementation roadmaps or timelines
- Include detailed tutorials or step-by-step instructions
- Pause for user input
- Examine existing codebase or project structure
- Create files outside session directory
- Force domains into predefined categories (let them emerge organically)

## File Operations

**Must Read**: `research_sessions/adr_example_format.md` (for ADR structure reference)
**Must Write**:

- 3-5 domain research documents to `research_sessions/[session_id]_[date]/research_[domain_name].md`
- Integrated ADR document to `research_sessions/[session_id]_[date]/architecture_decision_record.md`
- Navigation document to `research_sessions/[session_id]_[date]/research_navigation.md`
- Source materials to `research_sessions/[session_id]_[date]/sources/context7/` and `research_sessions/[session_id]_[date]/sources/web/`
- Session logs to `logs/research_[session_id]_*_[timestamp].log`
  **MCP/Context7**:
- **Claude Environment**: Use Context7 MCP two-step process (`context7:resolve-library-id` → `context7:get-library-docs`)
- **VS Code Environment**: Use Context7 wrapper script two-step process (`./scripts/context7.sh resolve` → `./scripts/context7.sh docs`)
  **Isolation**: All outputs confined to session directory, no project modifications
  **Source Capture**: **IMMEDIATELY PRESERVE** all Context7 responses and web content as organized source files upon receipt
