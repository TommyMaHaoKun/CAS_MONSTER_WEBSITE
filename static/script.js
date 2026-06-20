// CAS Autofill Web - Frontend Logic

// ---- i18n ----
const I18N = {
    en: {
        config: "Configuration",
        account: "Account",
        username: "Username",
        password: "Password",
        fetch_clubs: "Fetch clubs",
        tab_records: "Activity Records",
        tab_batch: "Weekly Batch Records",
        tab_reflection: "Activity Reflection",
        tab_tutorial: "Tutorial",
        tab_log: "Log",
        single_record: "Single Record",
        club: "Club",
        fetch_first: "Fetch clubs first",
        date: "Date",
        activity_theme: "Activity theme",
        hours_cas: "Hours (C/A/S)",
        run_single: "Run single record",
        weekly_batch: "Weekly Batch Records",
        club_desc: "Club description",
        weekday: "Weekday",
        select_weekday: "Select weekday",
        start_date: "Start date",
        end_date: "End date",
        periodic_label: "Periodic activity<br><small>(optional)</small>",
        theme_desc: "Theme/Description",
        auto_deepseek: "Generated automatically by Qwen",
        run_batch: "Run weekly batch",
        reflection: "Reflection",
        num_reflections: "Number of reflections",
        titles_label: "Titles<br><small>(one per line)</small>",
        descs_label: "Reflection descriptions<br><small>(optional, one per line)</small>",
        learning_outcomes: "Learning Outcomes",
        lo_awareness: "Awareness",
        lo_challenge: "Challenge",
        lo_initiative: "Initiative",
        lo_collaboration: "Collaboration",
        lo_commitment: "Commitment",
        lo_global: "Global Value",
        lo_ethics: "Ethics",
        lo_newskills: "New Skills",
        run_reflection: "Run reflection autofill",
        runtime_log: "Runtime Log",
        preview: "Preview",
        preview_record: "Record",
        preview_reflection: "Reflection",
        content_summary: "Content Summary (20 words)",
        reflection_content: "Reflection content (\u2265 550 words)",
        disclaimer_bold: "Disclaimer:",
        disclaimer_text: "This tool is intended solely for generating IB CAS activity records and reflections. Users must not generate any content that violates the laws of the People's Republic of China, including but not limited to politically sensitive material, pornography, violence, terrorism, discrimination, or any other illegal content. By using this service, you agree to comply with all applicable laws and regulations. The operator reserves the right to suspend access for any misuse.",
        // Placeholders
        ph_username: "Login account",
        ph_password: "Password",
        ph_theme: "e.g. Cold War Origins Discussion",
        ph_club_desc: "Brief club description",
        ph_start_date: "Select start date",
        ph_end_date: "Select end date",
        ph_periodic: "Optional recurring activity",
        ph_titles: "One title per line",
        ph_descs: "Optional: one description per line",
        // Tutorial
        tutorial_title: "How to Use CAS Autofill",
        tut_step1_title: "Step 1: Login",
        tut_step1: 'Enter your WFLA school system username and password in the Account section, then click "Fetch clubs" to load your available clubs.',
        tut_step2_title: "Step 2: Choose a Mode",
        tut_step2: "Select one of the three modes:",
        tut_mode1: "<strong>Activity Records</strong> \u2014 Fill a single activity record for one date. You provide the club, date, activity theme, and CAS hours.",
        tut_mode2: "<strong>Weekly Batch Records</strong> \u2014 Automatically generate and fill multiple weekly records within a date range. The AI generates unique themes and descriptions for each week.",
        tut_mode3: "<strong>Activity Reflection</strong> \u2014 Generate and submit CAS reflections. Provide titles, optional descriptions, and select learning outcomes.",
        tut_step3_title: "Step 3: Fill in the Form",
        tut_step3: 'Complete all required fields. For Weekly Batch, select a weekday first, then use the calendar to pick start/end dates (only the matching weekday is selectable). The "Periodic activity" field is optional \u2014 if provided, all generated records will share the same overarching theme.',
        tut_step4_title: "Step 4: Run",
        tut_step4: "Click the Run button. The system will log in to the school system, generate content via Qwen AI, and fill in the forms automatically. Check the Log tab and Preview panel for progress and results.",
        tut_hours_title: "CAS Hours",
        tut_hours: "C = Creativity, A = Activity, S = Service. Enter the number of hours for each category. Leave empty or enter 0 for categories that don't apply.",
        tut_tips_title: "Tips",
        tut_tip1: "The school system can be slow. Please be patient while the automation runs.",
        tut_tip2: "Check the Preview panel on the right to see generated content before it is submitted.",
        tut_tip3: "Use dark mode (toggle in top-right) for comfortable viewing at night.",
        tut_tip4: "For batch records, a more specific club description helps the AI generate better content.",
        tab_chat: "CAS AI",
        old_version: "Old Version",
        new_version: "New Version",
        subtitle_new: "CAS AI + Log",
        subtitle_old: "Records + Reflection + Weekly Batch",
        chat_welcome: "Hello! I'm your IB CAS AI advisor. I've studied all the CAS documents. Ask me anything about CAS requirements, activities, or reflections!",
        chat_placeholder: "Ask about IB CAS, or ask me to fill a form...",
        chat_send: "Send",
        chat_thinking: "Thinking...",
        thinking_toggle: "Thinking",
        thinking_label: "Thinking",
        // Login
        login_sub: "Sign in with your WFLA school account to begin.",
        remember_me: "Remember me on this device",
        login_btn: "Sign in",
        logout_btn: "Log out",
        refresh_clubs: "Refresh clubs",
        report_issue: "Report an issue",
        issue_title: "Report an issue",
        issue_category: "Type",
        issue_bug: "Bug",
        issue_suggestion: "Suggestion",
        issue_summary: "Summary",
        issue_summary_ph: "Short summary",
        issue_details: "Details",
        issue_details_ph: "What happened? What did you expect?",
        issue_contact: "Contact",
        issue_contact_ph: "Optional email for follow-up",
        issue_attachments: "Attachments",
        issue_add_files: "Add attachments",
        issue_send: "Send report",
        issue_sending: "Sending report...",
        issue_sent: "Report submitted. If this is the first submission, check the inbox/spam folder for the FormSubmit confirmation email.",
        issue_required: "Please include a summary and details.",
        issue_too_many: "You can attach up to 5 files.",
        issue_file_too_large: "Each attachment must be 10 MB or smaller.",
        login_empty: "Please enter your username and password.",
        login_verifying: "Signing in…",
        login_saved_failed: "Saved login failed. Please sign in again.",
        logout_confirm: "Log out and forget the saved account on this device?",
        // Chat chips
        chip_record: "Log a drama club activity on 2026/03/05, theme 'rehearsal', C 2h",
        chip_reflection: "Write a reflection for my service club on leadership",
        chip_help: "What are the 7 CAS learning outcomes?",
        // Approval card
        card_record_title: "Activity Record",
        card_reflection_title: "Activity Reflection",
        card_batch_title: "Weekly Batch Records",
        card_badge_review: "Needs approval",
        card_badge_done: "Submitted",
        card_badge_cancelled: "Cancelled",
        card_badge_running: "Submitting…",
        card_club: "Club",
        card_date: "Date",
        card_theme: "Theme",
        card_hours: "Hours C/A/S",
        card_titles: "Titles",
        card_outcomes: "Outcomes",
        card_weekday: "Weekday",
        card_range: "Date range",
        card_weeks: "Weeks",
        card_periodic: "Periodic",
        card_description: "Generated description",
        card_summary: "Summary",
        card_content: "Reflection content",
        card_sample: "Sample (first week)",
        card_batch_note: "Each weekly record is generated and filled during submission.",
        card_approve: "Approve & submit",
        card_edit: "Edit",
        card_cancel: "Cancel",
        card_submitting: "Submitting to the school system…",
        card_done: "Submitted successfully.",
        card_cancelled_msg: "Cancelled. Nothing was submitted.",
        card_need_login: "Please sign in first.",
        card_need_outcome: "Please select at least one Learning Outcome.",
        chat_disclaimer: "CAS Monster uses AI and may make mistakes. Always review generated content before approving.",
        chat_empty: "Sorry, I didn't catch that. Could you rephrase, or tell me the club, date, theme and hours?",
        attach_files: "Add files or photos",
        attach_reading: "Reading…",
        attach_too_many: "You can attach up to 5 files.",
        attach_failed: "Could not read this file.",
        attach_default: "Please read the attached file(s).",
        quick_add_record: "Add Record",
        quick_add_reflection: "Add Reflection",
        quick_record_title: "Add Record",
        quick_reflection_title: "Add Reflection",
        quick_generate: "Generate Cards",
        quick_request: "Request",
        quick_notes: "Description",
        quick_record_notes_ph: "Describe what happened in this activity. Qwen will generate the title and record content.",
        quick_reflection_notes_ph: "Describe what you want to reflect on. Qwen will generate the title, summary, and reflection content.",
        quick_no_clubs: "Please sign in and fetch clubs first.",
        quick_need_desc: "Please enter a description for every request.",
        quick_need_context: "Please enter a description or attach at least one readable file/photo for every request.",
        quick_need_date: "Please select a date for every record.",
        quick_cards_ready: "Generated review cards. Please check them before submitting.",
        quick_attach: "Attach files or photos",
    },
    zh: {
        config: "\u914D\u7F6E",
        account: "\u8D26\u6237",
        username: "\u7528\u6237\u540D",
        password: "\u5BC6\u7801",
        fetch_clubs: "\u83B7\u53D6\u793E\u56E2",
        tab_records: "\u6D3B\u52A8\u8BB0\u5F55",
        tab_batch: "\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55",
        tab_reflection: "\u6D3B\u52A8\u53CD\u601D",
        tab_tutorial: "\u4F7F\u7528\u6559\u7A0B",
        tab_log: "\u65E5\u5FD7",
        single_record: "\u5355\u6761\u8BB0\u5F55",
        club: "\u793E\u56E2",
        fetch_first: "\u8BF7\u5148\u83B7\u53D6\u793E\u56E2",
        date: "\u65E5\u671F",
        activity_theme: "\u6D3B\u52A8\u4E3B\u9898",
        hours_cas: "\u5C0F\u65F6 (C/A/S)",
        run_single: "\u8FD0\u884C\u5355\u6761\u8BB0\u5F55",
        weekly_batch: "\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55",
        club_desc: "\u793E\u56E2\u63CF\u8FF0",
        weekday: "\u661F\u671F",
        select_weekday: "\u9009\u62E9\u661F\u671F",
        start_date: "\u5F00\u59CB\u65E5\u671F",
        end_date: "\u7ED3\u675F\u65E5\u671F",
        periodic_label: "\u5468\u671F\u6027\u6D3B\u52A8<br><small>(\u53EF\u9009)</small>",
        theme_desc: "\u4E3B\u9898/\u63CF\u8FF0",
        auto_deepseek: "\u7531 Qwen \u81EA\u52A8\u751F\u6210",
        run_batch: "\u8FD0\u884C\u6BCF\u5468\u6279\u91CF",
        reflection: "\u53CD\u601D",
        num_reflections: "\u53CD\u601D\u6570\u91CF",
        titles_label: "\u6807\u9898<br><small>(\u6BCF\u884C\u4E00\u4E2A)</small>",
        descs_label: "\u53CD\u601D\u63CF\u8FF0<br><small>(\u53EF\u9009\uFF0C\u6BCF\u884C\u4E00\u4E2A)</small>",
        learning_outcomes: "\u5B66\u4E60\u6210\u679C",
        lo_awareness: "\u8BA4\u77E5",
        lo_challenge: "\u6311\u6218",
        lo_initiative: "\u4E3B\u52A8\u6027",
        lo_collaboration: "\u5408\u4F5C",
        lo_commitment: "\u627F\u8BFA",
        lo_global: "\u5168\u7403\u4EF7\u503C",
        lo_ethics: "\u4F26\u7406",
        lo_newskills: "\u65B0\u6280\u80FD",
        run_reflection: "\u8FD0\u884C\u53CD\u601D\u81EA\u52A8\u586B\u5199",
        runtime_log: "\u8FD0\u884C\u65E5\u5FD7",
        preview: "\u9884\u89C8",
        preview_record: "\u8BB0\u5F55",
        preview_reflection: "\u53CD\u601D",
        content_summary: "\u5185\u5BB9\u6458\u8981\uFF0820\u8BCD\uFF09",
        reflection_content: "\u53CD\u601D\u5185\u5BB9\uFF08\u2265 550\u8BCD\uFF09",
        disclaimer_bold: "\u514D\u8D23\u58F0\u660E\uFF1A",
        disclaimer_text: "\u672C\u5DE5\u5177\u4EC5\u7528\u4E8E\u751F\u6210 IB CAS \u6D3B\u52A8\u8BB0\u5F55\u548C\u53CD\u601D\u3002\u7528\u6237\u4E0D\u5F97\u751F\u6210\u4EFB\u4F55\u8FDD\u53CD\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u6CD5\u5F8B\u7684\u5185\u5BB9\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u653F\u6CBB\u654F\u611F\u5185\u5BB9\u3001\u8272\u60C5\u3001\u66B4\u529B\u3001\u6050\u6016\u4E3B\u4E49\u3001\u6B67\u89C6\u6216\u5176\u4ED6\u4EFB\u4F55\u8FDD\u6CD5\u5185\u5BB9\u3002\u4F7F\u7528\u672C\u670D\u52A1\u5373\u8868\u793A\u60A8\u540C\u610F\u9075\u5B88\u6240\u6709\u9002\u7528\u6CD5\u5F8B\u6CD5\u89C4\u3002\u8FD0\u8425\u65B9\u4FDD\u7559\u56E0\u6EE5\u7528\u800C\u6682\u505C\u8BBF\u95EE\u7684\u6743\u5229\u3002",
        // Placeholders
        ph_username: "\u767B\u5F55\u8D26\u53F7",
        ph_password: "\u5BC6\u7801",
        ph_theme: "\u4F8B\u5982\uFF1A\u51B7\u6218\u8D77\u6E90\u8BA8\u8BBA",
        ph_club_desc: "\u7B80\u8981\u793E\u56E2\u63CF\u8FF0",
        ph_start_date: "\u9009\u62E9\u5F00\u59CB\u65E5\u671F",
        ph_end_date: "\u9009\u62E9\u7ED3\u675F\u65E5\u671F",
        ph_periodic: "\u53EF\u9009\u7684\u5468\u671F\u6027\u6D3B\u52A8",
        ph_titles: "\u6BCF\u884C\u4E00\u4E2A\u6807\u9898",
        ph_descs: "\u53EF\u9009\uFF1A\u6BCF\u884C\u4E00\u4E2A\u63CF\u8FF0",
        // Tutorial
        tutorial_title: "CAS Autofill \u4F7F\u7528\u6559\u7A0B",
        tut_step1_title: "\u7B2C\u4E00\u6B65\uFF1A\u767B\u5F55",
        tut_step1: "\u5728\u8D26\u6237\u533A\u57DF\u8F93\u5165\u60A8\u7684 WFLA \u6821\u56ED\u7CFB\u7EDF\u7528\u6237\u540D\u548C\u5BC6\u7801\uFF0C\u7136\u540E\u70B9\u51FB\u201C\u83B7\u53D6\u793E\u56E2\u201D\u52A0\u8F7D\u60A8\u7684\u53EF\u7528\u793E\u56E2\u3002",
        tut_step2_title: "\u7B2C\u4E8C\u6B65\uFF1A\u9009\u62E9\u6A21\u5F0F",
        tut_step2: "\u9009\u62E9\u4E09\u79CD\u6A21\u5F0F\u4E4B\u4E00\uFF1A",
        tut_mode1: "<strong>\u6D3B\u52A8\u8BB0\u5F55</strong> \u2014 \u4E3A\u67D0\u4E00\u5929\u586B\u5199\u5355\u6761\u6D3B\u52A8\u8BB0\u5F55\u3002\u60A8\u9700\u63D0\u4F9B\u793E\u56E2\u3001\u65E5\u671F\u3001\u6D3B\u52A8\u4E3B\u9898\u548C CAS \u5C0F\u65F6\u6570\u3002",
        tut_mode2: "<strong>\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55</strong> \u2014 \u5728\u65E5\u671F\u8303\u56F4\u5185\u81EA\u52A8\u751F\u6210\u5E76\u586B\u5199\u591A\u6761\u6BCF\u5468\u8BB0\u5F55\u3002AI \u4F1A\u4E3A\u6BCF\u5468\u751F\u6210\u72EC\u7279\u7684\u4E3B\u9898\u548C\u63CF\u8FF0\u3002",
        tut_mode3: "<strong>\u6D3B\u52A8\u53CD\u601D</strong> \u2014 \u751F\u6210\u5E76\u63D0\u4EA4 CAS \u53CD\u601D\u3002\u63D0\u4F9B\u6807\u9898\u3001\u53EF\u9009\u63CF\u8FF0\uFF0C\u5E76\u9009\u62E9\u5B66\u4E60\u6210\u679C\u3002",
        tut_step3_title: "\u7B2C\u4E09\u6B65\uFF1A\u586B\u5199\u8868\u5355",
        tut_step3: "\u5B8C\u6210\u6240\u6709\u5FC5\u586B\u5B57\u6BB5\u3002\u5BF9\u4E8E\u6BCF\u5468\u6279\u91CF\uFF0C\u5148\u9009\u62E9\u661F\u671F\uFF0C\u7136\u540E\u4F7F\u7528\u65E5\u5386\u9009\u62E9\u5F00\u59CB/\u7ED3\u675F\u65E5\u671F\uFF08\u53EA\u6709\u5339\u914D\u7684\u661F\u671F\u53EF\u9009\uFF09\u3002\u201C\u5468\u671F\u6027\u6D3B\u52A8\u201D\u5B57\u6BB5\u4E3A\u53EF\u9009 \u2014 \u5982\u679C\u586B\u5199\uFF0C\u6240\u6709\u751F\u6210\u7684\u8BB0\u5F55\u5C06\u5171\u4EAB\u76F8\u540C\u7684\u603B\u4E3B\u9898\u3002",
        tut_step4_title: "\u7B2C\u56DB\u6B65\uFF1A\u8FD0\u884C",
        tut_step4: "\u70B9\u51FB\u8FD0\u884C\u6309\u94AE\u3002\u7CFB\u7EDF\u5C06\u767B\u5F55\u6821\u56ED\u7CFB\u7EDF\uFF0C\u901A\u8FC7 Qwen AI \u751F\u6210\u5185\u5BB9\uFF0C\u5E76\u81EA\u52A8\u586B\u5199\u8868\u5355\u3002\u67E5\u770B\u65E5\u5FD7\u9009\u9879\u5361\u548C\u9884\u89C8\u9762\u677F\u4EE5\u4E86\u89E3\u8FDB\u5EA6\u548C\u7ED3\u679C\u3002",
        tut_hours_title: "CAS \u5C0F\u65F6\u6570",
        tut_hours: "C = \u521B\u9020\u529B\uFF0CA = \u6D3B\u52A8\uFF0CS = \u670D\u52A1\u3002\u8F93\u5165\u6BCF\u4E2A\u7C7B\u522B\u7684\u5C0F\u65F6\u6570\u3002\u4E0D\u9002\u7528\u7684\u7C7B\u522B\u7559\u7A7A\u6216\u8F93\u5165 0\u3002",
        tut_tips_title: "\u63D0\u793A",
        tut_tip1: "\u6821\u56ED\u7CFB\u7EDF\u53EF\u80FD\u8F83\u6162\uFF0C\u8BF7\u5728\u81EA\u52A8\u5316\u8FD0\u884C\u65F6\u8010\u5FC3\u7B49\u5F85\u3002",
        tut_tip2: "\u67E5\u770B\u53F3\u4FA7\u9884\u89C8\u9762\u677F\u4EE5\u5728\u63D0\u4EA4\u524D\u67E5\u770B\u751F\u6210\u7684\u5185\u5BB9\u3002",
        tut_tip3: "\u4F7F\u7528\u6DF1\u8272\u6A21\u5F0F\uFF08\u53F3\u4E0A\u89D2\u5207\u6362\uFF09\u4EE5\u83B7\u5F97\u66F4\u8212\u9002\u7684\u591C\u95F4\u89C2\u770B\u4F53\u9A8C\u3002",
        tut_tip4: "\u5BF9\u4E8E\u6279\u91CF\u8BB0\u5F55\uFF0C\u66F4\u5177\u4F53\u7684\u793E\u56E2\u63CF\u8FF0\u6709\u52A9\u4E8E AI \u751F\u6210\u66F4\u597D\u7684\u5185\u5BB9\u3002",
        tab_chat: "CAS AI",
        old_version: "\u65E7\u7248\u672C",
        new_version: "\u65B0\u7248\u672C",
        subtitle_new: "CAS AI + \u65E5\u5FD7",
        subtitle_old: "\u8BB0\u5F55 + \u53CD\u601D + \u6BCF\u5468\u6279\u91CF",
        chat_welcome: "\u4F60\u597D\uFF01\u6211\u662F\u4F60\u7684 IB CAS AI \u987E\u95EE\uFF0C\u5DF2\u5B66\u4E60\u4E86\u6240\u6709CAS\u6587\u6863\u3002\u6709\u4EFB\u4F55\u5173\u4E8E CAS \u8981\u6C42\u3001\u6D3B\u52A8\u6216\u53CD\u601D\u7684\u95EE\u9898\u90FD\u53EF\u4EE5\u95EE\u6211\uFF01",
        chat_placeholder: "\u8BE2\u95EE CAS\uFF0C\u6216\u8BA9\u6211\u5E2E\u4F60\u586B\u5199\u8868\u5355\u2026",
        chat_send: "\u53D1\u9001",
        chat_thinking: "\u601D\u8003\u4E2D\u2026",
        thinking_toggle: "Thinking",
        thinking_label: "\u601D\u8003",
        // Login
        login_sub: "\u4F7F\u7528\u4F60\u7684 WFLA \u6821\u56ED\u8D26\u53F7\u767B\u5F55\u4EE5\u5F00\u59CB\u3002",
        remember_me: "\u5728\u672C\u8BBE\u5907\u4E0A\u8BB0\u4F4F\u6211",
        login_btn: "\u767B\u5F55",
        logout_btn: "\u9000\u51FA\u767B\u5F55",
        refresh_clubs: "\u5237\u65B0\u793E\u56E2",
        report_issue: "\u62A5\u544A\u95EE\u9898",
        issue_title: "\u62A5\u544A\u95EE\u9898",
        issue_category: "\u7C7B\u578B",
        issue_bug: "Bug",
        issue_suggestion: "\u5EFA\u8BAE",
        issue_summary: "\u6458\u8981",
        issue_summary_ph: "\u7B80\u77ED\u6982\u62EC\u95EE\u9898\u6216\u5EFA\u8BAE",
        issue_details: "\u8BE6\u60C5",
        issue_details_ph: "\u53D1\u751F\u4E86\u4EC0\u4E48\uFF1F\u4F60\u671F\u671B\u7684\u7ED3\u679C\u662F\u4EC0\u4E48\uFF1F",
        issue_contact: "\u8054\u7CFB\u65B9\u5F0F",
        issue_contact_ph: "\u53EF\u9009\uFF1A\u7528\u4E8E\u56DE\u590D\u7684\u90AE\u7BB1",
        issue_attachments: "\u9644\u4EF6",
        issue_add_files: "\u6DFB\u52A0\u9644\u4EF6",
        issue_send: "\u53D1\u9001\u62A5\u544A",
        issue_sending: "\u6B63\u5728\u53D1\u9001...",
        issue_sent: "\u62A5\u544A\u5DF2\u63D0\u4EA4\u3002\u5982\u679C\u662F\u7B2C\u4E00\u6B21\u4F7F\u7528\uFF0C\u8BF7\u68C0\u67E5 FormSubmit \u786E\u8BA4\u90AE\u4EF6\uFF08\u5305\u62EC\u5783\u573E\u7BB1\uFF09\u3002",
        issue_required: "\u8BF7\u586B\u5199\u6458\u8981\u548C\u8BE6\u60C5\u3002",
        issue_too_many: "\u6700\u591A\u53EA\u80FD\u9644\u52A0 5 \u4E2A\u6587\u4EF6\u3002",
        issue_file_too_large: "\u6BCF\u4E2A\u9644\u4EF6\u4E0D\u80FD\u8D85\u8FC7 10 MB\u3002",
        login_empty: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801\u3002",
        login_verifying: "\u767B\u5F55\u4E2D\u2026",
        login_saved_failed: "\u4FDD\u5B58\u7684\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55\u3002",
        logout_confirm: "\u9000\u51FA\u767B\u5F55\u5E76\u6E05\u9664\u672C\u8BBE\u5907\u4E0A\u4FDD\u5B58\u7684\u8D26\u53F7\uFF1F",
        // Chat chips
        chip_record: "\u5E2E\u6211\u586B\u620F\u5267\u793E 2026/03/05 \u7684\u8BB0\u5F55\uFF0C\u4E3B\u9898\u201C\u6392\u7EC3\u201D\uFF0CC 2\u5C0F\u65F6",
        chip_reflection: "\u5E2E\u6211\u4E3A\u670D\u52A1\u793E\u5199\u4E00\u7BC7\u5173\u4E8E\u9886\u5BFC\u529B\u7684\u53CD\u601D",
        chip_help: "CAS \u7684 7 \u4E2A\u5B66\u4E60\u6210\u679C\u662F\u4EC0\u4E48\uFF1F",
        // Approval card
        card_record_title: "\u6D3B\u52A8\u8BB0\u5F55",
        card_reflection_title: "\u6D3B\u52A8\u53CD\u601D",
        card_batch_title: "\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55",
        card_badge_review: "\u5F85\u6279\u51C6",
        card_badge_done: "\u5DF2\u63D0\u4EA4",
        card_badge_cancelled: "\u5DF2\u53D6\u6D88",
        card_badge_running: "\u63D0\u4EA4\u4E2D\u2026",
        card_club: "\u793E\u56E2",
        card_date: "\u65E5\u671F",
        card_theme: "\u4E3B\u9898",
        card_hours: "\u5C0F\u65F6 C/A/S",
        card_titles: "\u6807\u9898",
        card_outcomes: "\u5B66\u4E60\u6210\u679C",
        card_weekday: "\u661F\u671F",
        card_range: "\u65E5\u671F\u8303\u56F4",
        card_weeks: "\u5468\u6570",
        card_periodic: "\u5468\u671F\u6027\u6D3B\u52A8",
        card_description: "\u751F\u6210\u7684\u63CF\u8FF0",
        card_summary: "\u6458\u8981",
        card_content: "\u53CD\u601D\u6B63\u6587",
        card_sample: "\u793A\u4F8B\uFF08\u7B2C\u4E00\u5468\uFF09",
        card_batch_note: "\u6BCF\u5468\u8BB0\u5F55\u5C06\u5728\u63D0\u4EA4\u8FC7\u7A0B\u4E2D\u9010\u6761\u751F\u6210\u5E76\u586B\u5199\u3002",
        card_approve: "\u6279\u51C6\u5E76\u63D0\u4EA4",
        card_edit: "\u7F16\u8F91",
        card_cancel: "\u53D6\u6D88",
        card_submitting: "\u6B63\u5728\u63D0\u4EA4\u5230\u6821\u56ED\u7CFB\u7EDF\u2026",
        card_done: "\u63D0\u4EA4\u6210\u529F\u3002",
        card_cancelled_msg: "\u5DF2\u53D6\u6D88\uFF0C\u672A\u63D0\u4EA4\u4EFB\u4F55\u5185\u5BB9\u3002",
        card_need_login: "\u8BF7\u5148\u767B\u5F55\u3002",
        card_need_outcome: "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u5B66\u4E60\u6210\u679C\u3002",
        chat_disclaimer: "CAS Monster \u7531 AI \u9A71\u52A8\uFF0C\u56DE\u7B54\u672A\u5FC5\u51C6\u786E\u3002\u6279\u51C6\u524D\u8BF7\u52A1\u5FC5\u68C0\u67E5\u751F\u6210\u7684\u5185\u5BB9\u3002",
        chat_empty: "\u62B1\u6B49\uFF0C\u6211\u6CA1\u592A\u7406\u89E3\u3002\u80FD\u518D\u8BF4\u4E00\u904D\u5417\uFF1F\u6216\u76F4\u63A5\u544A\u8BC9\u6211\u793E\u56E2\u3001\u65E5\u671F\u3001\u4E3B\u9898\u548C\u5C0F\u65F6\u6570\u3002",
        attach_files: "\u6DFB\u52A0\u6587\u4EF6\u6216\u7167\u7247",
        attach_reading: "\u8BFB\u53D6\u4E2D\u2026",
        attach_too_many: "\u6700\u591A\u53EA\u80FD\u9644\u52A0 5 \u4E2A\u6587\u4EF6\u3002",
        attach_failed: "\u65E0\u6CD5\u8BFB\u53D6\u8BE5\u6587\u4EF6\u3002",
        attach_default: "\u8BF7\u9605\u8BFB\u6211\u4E0A\u4F20\u7684\u6587\u4EF6\u3002",
        quick_add_record: "\u6DFB\u52A0\u8BB0\u5F55",
        quick_add_reflection: "\u6DFB\u52A0\u53CD\u601D",
        quick_record_title: "\u6DFB\u52A0\u8BB0\u5F55",
        quick_reflection_title: "\u6DFB\u52A0\u53CD\u601D",
        quick_generate: "\u751F\u6210\u5361\u7247",
        quick_request: "\u8BF7\u6C42",
        quick_notes: "\u63CF\u8FF0",
        quick_record_notes_ph: "\u63CF\u8FF0\u8FD9\u6B21\u6D3B\u52A8\u53D1\u751F\u4E86\u4EC0\u4E48\u3002Qwen \u4F1A\u751F\u6210\u6807\u9898\u548C\u8BB0\u5F55\u5185\u5BB9\u3002",
        quick_reflection_notes_ph: "\u63CF\u8FF0\u4F60\u60F3\u53CD\u601D\u7684\u5185\u5BB9\u3002Qwen \u4F1A\u751F\u6210\u6807\u9898\u3001\u6458\u8981\u548C\u53CD\u601D\u6B63\u6587\u3002",
        quick_no_clubs: "\u8BF7\u5148\u767B\u5F55\u5E76\u83B7\u53D6\u793E\u56E2\u3002",
        quick_need_desc: "\u8BF7\u4E3A\u6BCF\u4E2A\u8BF7\u6C42\u586B\u5199\u63CF\u8FF0\u3002",
        quick_need_context: "\u8BF7\u4E3A\u6BCF\u4E2A\u8BF7\u6C42\u586B\u5199\u63CF\u8FF0\uFF0C\u6216\u9644\u52A0\u81F3\u5C11\u4E00\u4E2A\u53EF\u8BFB\u53D6\u7684\u6587\u4EF6/\u7167\u7247\u3002",
        quick_need_date: "\u8BF7\u4E3A\u6BCF\u6761\u8BB0\u5F55\u9009\u62E9\u65E5\u671F\u3002",
        quick_cards_ready: "\u5DF2\u751F\u6210\u5BA1\u6838\u5361\u7247\uFF0C\u8BF7\u68C0\u67E5\u540E\u518D\u63D0\u4EA4\u3002",
        quick_attach: "\u6DFB\u52A0\u6587\u4EF6\u6216\u7167\u7247",
    },
};

let currentLang = localStorage.getItem("cas-lang") || "en";
const THINKING_KEY = "cas-thinking-enabled";
const VERSION_KEY = "cas-version-mode";
const OLD_VERSION_TABS = ["tab-records", "tab-batch", "tab-reflection", "tab-tutorial"];
const CHAT_HISTORY_LIMIT = 1000;

function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    const t = I18N[lang];
    const langLabel = lang === "en" ? "\u4E2D\u6587" : "EN";
    document.querySelectorAll("#lang-toggle, #login-lang-toggle").forEach((b) => { b.textContent = langLabel; });
    // Text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) el.textContent = t[key];
    });
    // HTML content (for labels with <br><small>)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
    // Placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        const key = el.getAttribute("data-i18n-ph");
        if (t[key] !== undefined) el.placeholder = t[key];
    });
    // Tutorial list items use innerHTML
    document.querySelectorAll(".tutorial-list [data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
    syncVersionToggleText();
}

function toggleLang() {
    const next = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("cas-lang", next);
    applyLang(next);
}

function isChatThinkingEnabled() {
    const el = document.getElementById("chat-thinking-toggle");
    return !!(el && el.checked);
}

function saveThinkingPreference() {
    localStorage.setItem(THINKING_KEY, isChatThinkingEnabled() ? "1" : "0");
}

function initThinkingPreference() {
    const el = document.getElementById("chat-thinking-toggle");
    if (el) el.checked = localStorage.getItem(THINKING_KEY) === "1";
}

function currentVersionMode() {
    return localStorage.getItem(VERSION_KEY) === "old" ? "old" : "new";
}

function syncVersionToggleText() {
    const btn = document.getElementById("version-toggle");
    const isOld = currentVersionMode() === "old";
    if (btn) {
        const key = isOld ? "new_version" : "old_version";
        btn.textContent = I18N[currentLang][key] || (isOld ? "New Version" : "Old Version");
        btn.setAttribute("aria-label", btn.textContent);
    }
    const subtitle = document.querySelector(".app-subtitle");
    if (subtitle) {
        const subtitleKey = isOld ? "subtitle_old" : "subtitle_new";
        subtitle.textContent = I18N[currentLang][subtitleKey] || (isOld ? "Records + Reflection + Weekly Batch" : "CAS AI + Log");
    }
}

function getActiveTabId() {
    const active = document.querySelector(".tab-btn.active");
    return active ? active.dataset.tab : "tab-chat";
}

function activateTab(tabId) {
    const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const panel = document.getElementById(tabId);
    if (!btn || !panel) return;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    panel.classList.add("active");
    updateChatMode();
}

function applyVersionMode(mode) {
    const isOld = mode === "old";
    document.body.classList.toggle("old-version", isOld);
    document.body.classList.toggle("new-version", !isOld);
    document.querySelectorAll(".old-version-only").forEach((el) => {
        el.hidden = !isOld;
    });
    syncVersionToggleText();
    if (!isOld && OLD_VERSION_TABS.includes(getActiveTabId())) {
        activateTab("tab-chat");
    } else {
        updateChatMode();
    }
}

function toggleVersionMode() {
    const next = currentVersionMode() === "old" ? "new" : "old";
    localStorage.setItem(VERSION_KEY, next);
    applyVersionMode(next);
}

function initVersionMode() {
    applyVersionMode(currentVersionMode());
}

// ---- Dark mode ----
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = theme === "dark" ? "&#9788;" : "&#9790;";
    document.querySelectorAll("#theme-toggle, #login-theme-toggle").forEach((b) => { b.innerHTML = icon; });
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("cas-theme", next);
    applyTheme(next);
}

// Apply saved theme and language immediately
applyTheme(localStorage.getItem("cas-theme") || "light");
applyLang(currentLang);
initThinkingPreference();
initVersionMode();

const socket = io();

// ---- State ----
let isRunning = false;
let loginMode = null;            // null | "manual" | "auto"
let CURRENT_USER = "";
let CURRENT_PW = "";
let availableClubs = [];          // clubs known to the chat agent
let availableRecordClubs = [];
let availableReflectionClubs = [];
const submittingCards = { record: [], reflection: [], batch: [] }; // FIFO of card ids awaiting task_done

// ---- Socket events ----
socket.on("connect", () => {
    appendLog("[System] Connected to server.");
});

socket.on("disconnect", () => {
    appendLog("[System] Disconnected from server.");
});

socket.on("log", (data) => {
    appendLog(data.msg);
});

socket.on("error", (data) => {
    // During (auto) login, surface failures on the login screen instead of an alert.
    if (loginMode) {
        const t = I18N[currentLang];
        if (loginMode === "auto") {
            doLogout(true);
            showLoginError(t.login_saved_failed || data.msg);
        } else {
            showLoginError(data.msg);
        }
        resetLoginButton();
        loginMode = null;
        return;
    }
    appendLog("[Error] " + data.msg);
    alert(data.msg);
});

socket.on("clubs_fetched", (data) => {
    populateSelect("rec-club", data.clubs_records);
    populateSelect("batch-club", data.clubs_records);
    populateSelect("ref-club", data.clubs_reflection);
    availableRecordClubs = data.clubs_records || [];
    availableReflectionClubs = data.clubs_reflection || [];
    availableClubs = Array.from(new Set([...availableRecordClubs, ...availableReflectionClubs]));
    refreshQuickClubSelects();
    setButtonsRunning(false);
    appendLog("[Clubs] Dropdowns updated.");
    // Finishing a login round-trip?
    if (loginMode) {
        if (loginMode === "manual" && document.getElementById("remember-me").checked) {
            saveCreds(CURRENT_USER, CURRENT_PW);
        }
        enterApp();
        resetLoginButton();
        loginMode = null;
    }
});

socket.on("preview_record", (data) => {
    document.getElementById("preview-record").textContent = data.text;
});

socket.on("preview_reflection", (data) => {
    document.getElementById("preview-summary").textContent = data.summary;
    document.getElementById("preview-reflection").textContent = data.content;
});

socket.on("task_done", (data) => {
    setButtonsRunning(false);
    const task = (data && data.task) || "";
    if (submittingCards[task] && submittingCards[task].length) {
        const cardId = submittingCards[task].shift();
        markCardDone(cardId);
    }
});

// ---- Tab switching ----
document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        activateTab(btn.dataset.tab);
    });
});

// ---- Fullscreen (Gemini-style) chat mode ----
function positionChat() {
    const headers = document.querySelector(".tab-headers");
    if (!headers) return;
    const top = Math.max(0, Math.round(headers.getBoundingClientRect().bottom));
    document.documentElement.style.setProperty("--chat-top", top + "px");
}

function updateChatMode() {
    const chatTab = document.getElementById("tab-chat");
    const on = !!chatTab && chatTab.classList.contains("active");
    document.body.classList.toggle("chat-active", on);
    if (on) {
        requestAnimationFrame(() => {
            positionChat();
            const msgs = document.getElementById("chat-messages");
            if (msgs) msgs.scrollTop = msgs.scrollHeight;
        });
    }
}

window.addEventListener("resize", () => {
    if (document.body.classList.contains("chat-active")) positionChat();
});

document.querySelectorAll(".preview-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".preview-tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".preview-tab-content").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.ptab).classList.add("active");
    });
});

// ---- Helpers ----
function appendLog(msg) {
    const logBox = document.getElementById("log-output");
    logBox.textContent += msg + "\n";
    logBox.scrollTop = logBox.scrollHeight;
}

function populateSelect(id, options) {
    const sel = document.getElementById(id);
    sel.innerHTML = "";
    options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        sel.appendChild(o);
    });
    sel.disabled = false;
}

function getAccount() {
    const user = document.getElementById("username").value.trim();
    const pw = document.getElementById("password").value.trim();
    if (!user || !pw) {
        throw new Error("Username/Password cannot be empty.");
    }
    return { username: user, password: pw };
}

function setButtonsRunning(running) {
    isRunning = running;
    const btns = [
        "btn-refresh-clubs",
        "btn-run-record",
        "btn-run-batch",
        "btn-run-reflection",
    ];
    btns.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.disabled = running;
    });
}

function formatDateForBackend(dateStr) {
    return dateStr.replace(/-/g, "/");
}

// ---- Custom Calendar Date Picker (weekday filtering) ----
const WEEKDAY_MAP = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 0 };
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function createCalendar(calId, inputId) {
    const cal = document.getElementById(calId);
    const input = document.getElementById(inputId);
    let viewYear, viewMonth;

    const today = new Date();
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();

    input.addEventListener("click", (e) => {
        e.stopPropagation();
        const weekday = document.getElementById("batch-weekday").value;
        if (!weekday) { alert("Please select a weekday first."); return; }
        // Close other calendar
        document.querySelectorAll(".cal-dropdown").forEach((c) => { if (c.id !== calId) c.classList.remove("open"); });
        cal.classList.toggle("open");
        if (cal.classList.contains("open")) render();
    });

    document.addEventListener("click", (e) => {
        if (!cal.contains(e.target) && e.target !== input) cal.classList.remove("open");
    });

    function getWeekdayIndex() {
        const w = document.getElementById("batch-weekday").value;
        return w ? WEEKDAY_MAP[w] : -1;
    }

    function render() {
        const allowedDay = getWeekdayIndex();
        const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

        let html = `<div class="cal-nav">
            <button class="cal-nav-btn" data-action="prev-year">&laquo;</button>
            <button class="cal-nav-btn" data-action="prev-month">&lsaquo;</button>
            <span class="cal-title">${MONTH_NAMES[viewMonth]} ${viewYear}</span>
            <button class="cal-nav-btn" data-action="next-month">&rsaquo;</button>
            <button class="cal-nav-btn" data-action="next-year">&raquo;</button>
        </div>`;
        html += `<div class="cal-grid">`;
        ["Mo","Tu","We","Th","Fr","Sa","Su"].forEach((d) => { html += `<div class="cal-header">${d}</div>`; });

        // Adjust firstDay to Monday-based (0=Mon)
        const startOffset = (firstDay + 6) % 7;

        for (let i = 0; i < 42; i++) {
            let dayNum = i - startOffset + 1;
            let inMonth = true;
            let dispYear = viewYear, dispMonth = viewMonth, dispDay;

            if (dayNum < 1) {
                // Previous month
                inMonth = false;
                const pm = viewMonth === 0 ? 11 : viewMonth - 1;
                const py = viewMonth === 0 ? viewYear - 1 : viewYear;
                dispDay = daysInPrev + dayNum;
                dispYear = py; dispMonth = pm;
            } else if (dayNum > daysInMonth) {
                inMonth = false;
                const nm = viewMonth === 11 ? 0 : viewMonth + 1;
                const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
                dispDay = dayNum - daysInMonth;
                dispYear = ny; dispMonth = nm;
            } else {
                dispDay = dayNum;
            }

            const dateObj = new Date(dispYear, dispMonth, dispDay);
            const isAllowed = dateObj.getDay() === allowedDay;
            const dateStr = `${dispYear}/${String(dispMonth + 1).padStart(2, "0")}/${String(dispDay).padStart(2, "0")}`;

            let cls = "cal-day";
            if (!inMonth) cls += " cal-dim";
            if (isAllowed) cls += " cal-allowed";
            else cls += " cal-disabled";

            if (isAllowed) {
                html += `<div class="${cls}" data-date="${dateStr}">${dispDay}</div>`;
            } else {
                html += `<div class="${cls}">${dispDay}</div>`;
            }
        }
        html += `</div>`;
        cal.innerHTML = html;

        // Bind nav buttons
        cal.querySelectorAll(".cal-nav-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                if (action === "prev-year") viewYear--;
                else if (action === "next-year") viewYear++;
                else if (action === "prev-month") { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } }
                else if (action === "next-month") { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } }
                render();
            });
        });

        // Bind day clicks
        cal.querySelectorAll(".cal-day.cal-allowed").forEach((el) => {
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                input.value = el.dataset.date;
                cal.classList.remove("open");
            });
        });
    }
}

// Initialize calendars for batch start/end
createCalendar("cal-batch-start", "batch-start");
createCalendar("cal-batch-end", "batch-end");

// Reset dates when weekday changes
document.getElementById("batch-weekday").addEventListener("change", () => {
    document.getElementById("batch-start").value = "";
    document.getElementById("batch-end").value = "";
});

// ---- Login / Logout ----
const CREDS_KEY = "cas-creds";

function saveCreds(u, p) {
    try { localStorage.setItem(CREDS_KEY, JSON.stringify({ u, p })); } catch (e) {}
}
function loadCreds() {
    try { return JSON.parse(localStorage.getItem(CREDS_KEY) || "null"); } catch (e) { return null; }
}
function clearCreds() {
    try { localStorage.removeItem(CREDS_KEY); } catch (e) {}
}

function enterApp() {
    document.body.classList.add("logged-in");
    updateChatMode();
}
function showLogin() { document.body.classList.remove("logged-in"); }

function showLoginError(msg) {
    const el = document.getElementById("login-error");
    if (el) el.textContent = msg || "";
}

function resetLoginButton() {
    const btn = document.getElementById("btn-login");
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = I18N[currentLang].login_btn || "Sign in";
}

function doLogin() {
    if (loginMode) return;
    const t = I18N[currentLang];
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    if (!u || !p) { showLoginError(t.login_empty); return; }
    CURRENT_USER = u;
    CURRENT_PW = p;
    loginMode = "manual";
    showLoginError("");
    const btn = document.getElementById("btn-login");
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>' + (t.login_verifying || "Signing in…");
    appendLog("[Login] Verifying account with the school system…");
    socket.emit("fetch_clubs", { username: u, password: p });
}

function doLogout(silent) {
    if (!silent) {
        const t = I18N[currentLang];
        if (!confirm(t.logout_confirm || "Log out?")) return;
    }
    clearCreds();
    CURRENT_USER = "";
    CURRENT_PW = "";
    availableClubs = [];
    availableRecordClubs = [];
    availableReflectionClubs = [];
    const pw = document.getElementById("password");
    if (pw) pw.value = "";
    ["rec-club", "batch-club", "ref-club"].forEach((id) => {
        const sel = document.getElementById(id);
        if (sel) { sel.innerHTML = ""; sel.disabled = true; }
    });
    showLogin();
}

function tryAutoLogin() {
    const c = loadCreds();
    if (!c || !c.u || !c.p) return;
    document.getElementById("username").value = c.u;
    document.getElementById("password").value = c.p;
    document.getElementById("remember-me").checked = true;
    CURRENT_USER = c.u;
    CURRENT_PW = c.p;
    loginMode = "auto";
    enterApp(); // optimistic; reverted by the error handler if creds fail
    appendLog("[Login] Auto sign-in with saved account…");
    socket.emit("fetch_clubs", { username: c.u, password: c.p });
}

// Attempt auto-login once the socket is connected (emits buffer until then).
tryAutoLogin();

// ---- Actions ----
function fetchClubs() {
    if (isRunning || loginMode) return;
    try {
        const acc = getAccount();
        setButtonsRunning(true);
        appendLog("[Clubs] Fetching clubs...");
        socket.emit("fetch_clubs", acc);
    } catch (e) {
        alert(e.message);
    }
}

function runRecord() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        const club = document.getElementById("rec-club").value;
        const date = document.getElementById("rec-date").value;
        const theme = document.getElementById("rec-theme").value.trim();
        const c = document.getElementById("rec-c").value.trim() || "0";
        const a = document.getElementById("rec-a").value.trim() || "0";
        const s = document.getElementById("rec-s").value.trim() || "0";

        if (!club) throw new Error("Please fetch and select a club.");
        if (!date) throw new Error("Please select a date.");
        if (!theme) throw new Error("Activity theme cannot be empty.");

        setButtonsRunning(true);
        appendLog("[Records] Starting single record...");
        socket.emit("run_record", {
            ...acc,
            club,
            date: formatDateForBackend(date),
            theme,
            c_hours: c,
            a_hours: a,
            s_hours: s,
        });
    } catch (e) {
        alert(e.message);
    }
}

function runBatch() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        const club = document.getElementById("batch-club").value;
        const clubDesc = document.getElementById("batch-club-desc").value.trim();
        const weekday = document.getElementById("batch-weekday").value;
        const start = document.getElementById("batch-start").value;
        const end = document.getElementById("batch-end").value;
        const periodic = document.getElementById("batch-periodic").value.trim();
        const c = document.getElementById("batch-c").value.trim() || "0";
        const a = document.getElementById("batch-a").value.trim() || "0";
        const s = document.getElementById("batch-s").value.trim() || "0";

        if (!club) throw new Error("Please fetch and select a club.");
        if (!clubDesc) throw new Error("Club description cannot be empty.");
        if (!weekday) throw new Error("Please select a weekday.");
        if (!start || !end) throw new Error("Please select both start and end dates.");

        setButtonsRunning(true);
        appendLog("[Batch] Starting weekly batch...");
        socket.emit("run_batch", {
            ...acc,
            club,
            club_desc: clubDesc,
            weekday,
            start_date: formatDateForBackend(start),
            end_date: formatDateForBackend(end),
            periodic,
            c_hours: c,
            a_hours: a,
            s_hours: s,
        });
    } catch (e) {
        alert(e.message);
    }
}

function runReflection() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        const club = document.getElementById("ref-club").value;
        const count = parseInt(document.getElementById("ref-count").value);
        const clubDesc = document.getElementById("ref-club-desc").value.trim();
        const titlesRaw = document.getElementById("ref-titles").value.trim();
        const descsRaw = document.getElementById("ref-descs").value.trim();

        if (!club) throw new Error("Please fetch and select a club.");
        if (!clubDesc) throw new Error("Club description cannot be empty.");
        if (!titlesRaw) throw new Error("Please input at least one title.");

        const titles = titlesRaw.split("\n").map((t) => t.trim()).filter(Boolean);
        if (titles.length !== count) {
            throw new Error(`Number of titles (${titles.length}) must match count (${count}).`);
        }

        let descLines = [];
        if (descsRaw) {
            descLines = descsRaw.split("\n").map((d) => d.trim()).filter(Boolean);
            if (descLines.length !== count) {
                throw new Error(`Descriptions (${descLines.length}) must match count (${count}).`);
            }
        }

        const outcomes = [];
        document.querySelectorAll(".outcome-check input:checked").forEach((cb) => {
            outcomes.push(cb.value);
        });
        if (outcomes.length === 0) {
            throw new Error("Select at least one Learning Outcome.");
        }

        setButtonsRunning(true);
        appendLog("[Reflection] Starting reflection autofill...");
        socket.emit("run_reflection", {
            ...acc,
            club,
            club_desc: clubDesc,
            titles,
            desc_lines: descLines,
            outcomes,
        });
    } catch (e) {
        alert(e.message);
    }
}

// ---- CAS AI Chat ----
let chatHistory = [];

function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Minimal, self-contained Markdown renderer. Escapes HTML first to prevent XSS,
// then applies a safe subset of Markdown (headings, bold/italic, code, lists, links).
function renderMarkdown(src) {
    // Extract fenced code blocks first so their contents aren't processed.
    const codeBlocks = [];
    src = src.replace(/```[\w]*\n?([\s\S]*?)```/g, (m, code) => {
        codeBlocks.push(code.replace(/\n$/, ""));
        return "CB" + (codeBlocks.length - 1) + "";
    });

    const lines = src.split("\n");
    let html = "";
    let listType = null; // "ul" | "ol"
    const closeList = () => { if (listType) { html += `</${listType}>`; listType = null; } };

    const inline = (text) => {
        text = escapeHtml(text);
        text = text.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
        text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        text = text.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
        text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        return text;
    };

    for (const raw of lines) {
        const line = raw.replace(/\s+$/, "");
        const cb = line.match(/^CB(\d+)$/);
        if (cb) { closeList(); html += `<pre><code>${escapeHtml(codeBlocks[+cb[1]])}</code></pre>`; continue; }
        if (line.trim() === "") { closeList(); continue; }

        const h = line.match(/^(#{1,4})\s+(.*)$/);
        if (h) { closeList(); const lv = h[1].length; html += `<h${lv}>${inline(h[2])}</h${lv}>`; continue; }

        const ol = line.match(/^\s*\d+\.\s+(.*)$/);
        const ul = line.match(/^\s*[-*]\s+(.*)$/);
        if (ol) {
            if (listType !== "ol") { closeList(); html += "<ol>"; listType = "ol"; }
            html += `<li>${inline(ol[1])}</li>`; continue;
        }
        if (ul) {
            if (listType !== "ul") { closeList(); html += "<ul>"; listType = "ul"; }
            html += `<li>${inline(ul[1])}</li>`; continue;
        }
        closeList();
        html += `<p>${inline(line)}</p>`;
    }
    closeList();
    return html;
}

function appendChatBubble(role, text, isThinking) {
    const container = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.className = "chat-bubble " + role;
    if (isThinking) div.id = "chat-thinking-bubble";
    const inner = document.createElement("div");
    inner.className = "chat-bubble-inner";
    if (isThinking) {
        inner.innerHTML = `<span class="thinking-dots" aria-label="${escapeAttr(text || "Thinking")}"><span></span><span></span><span></span></span>`;
        div.appendChild(inner);
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return div;
    }
    // Render assistant replies as Markdown; keep user input / status as plain text.
    if (role.indexOf("assistant") === 0) {
        inner.classList.add("markdown");
        inner.innerHTML = renderMarkdown(text);
    } else {
        inner.style.whiteSpace = "pre-wrap";
        inner.textContent = text;
    }
    div.appendChild(inner);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function appendThinkingContent(text) {
    if (!text || !text.trim()) return null;
    const container = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.className = "chat-thinking-content";
    div.innerHTML =
        `<div class="chat-thinking-label">${escapeHtml(I18N[currentLang].thinking_label || "Thinking")}</div>` +
        `<div class="chat-thinking-body">${escapeHtml(text)}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function hideChatSuggestions() {
    const s = document.getElementById("chat-suggestions");
    if (s) s.style.display = "none";
}

function useSuggestion(el) {
    const input = document.getElementById("chat-input");
    input.value = el.textContent.trim();
    autoGrowInput(input);
    input.focus();
}

// Auto-size a textarea to fit its content up to data-maxlines lines, then scroll.
function autoGrow(el) {
    const maxLines = parseInt(el.dataset.maxlines || "10", 10);
    const cs = getComputedStyle(el);
    let line = parseFloat(cs.lineHeight);
    if (isNaN(line)) line = parseFloat(cs.fontSize) * 1.4;
    const padT = parseFloat(cs.paddingTop) || 0;
    const padB = parseFloat(cs.paddingBottom) || 0;
    const brdT = parseFloat(cs.borderTopWidth) || 0;
    const brdB = parseFloat(cs.borderBottomWidth) || 0;
    const maxH = line * maxLines + padT + padB + brdT + brdB;
    el.style.height = "auto";
    const needed = el.scrollHeight + brdT + brdB;
    el.style.height = Math.min(needed, maxH) + "px";
    el.style.overflowY = needed > maxH + 1 ? "auto" : "hidden";
}

function autoGrowInput(el) {
    el.dataset.maxlines = "7";
    autoGrow(el);
}

function onChatKeydown(e) {
    // Enter sends; Shift+Enter inserts a newline.
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendChat();
    }
}

// ---- Quick Add Record / Reflection panels ----
let quickMode = "record";
let quickSeq = 0;
const quickAttachments = {};

function getQuickClubs() {
    return quickMode === "record" ? availableRecordClubs : availableReflectionClubs;
}

function optionHtml(options, selected) {
    return (options || []).map((opt) => {
        const sel = opt === selected ? " selected" : "";
        return `<option value="${escapeAttr(opt)}"${sel}>${escapeHtml(opt)}</option>`;
    }).join("");
}

function escapeAttr(s) {
    return escapeHtml(String(s == null ? "" : s)).replace(/"/g, "&quot;");
}

function refreshQuickClubSelects() {
    document.querySelectorAll(".quick-club-select").forEach((sel) => {
        const selected = sel.value;
        const mode = sel.closest(".quick-request-card")?.dataset.mode || quickMode;
        const clubs = mode === "record" ? availableRecordClubs : availableReflectionClubs;
        sel.innerHTML = optionHtml(clubs, selected);
        sel.disabled = clubs.length === 0;
    });
}

function openQuickPanel(mode) {
    quickMode = mode;
    const t = I18N[currentLang];
    const modal = document.getElementById("quick-modal");
    const title = document.getElementById("quick-modal-title");
    const btn = document.getElementById("quick-generate-btn");
    document.getElementById("chat-attach-menu").classList.remove("open");
    title.textContent = mode === "record" ? t.quick_record_title : t.quick_reflection_title;
    btn.textContent = t.quick_generate;
    Object.keys(quickAttachments).forEach((key) => delete quickAttachments[key]);
    document.getElementById("quick-request-list").innerHTML = "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    addQuickRequest(mode);
}

function closeQuickPanel() {
    const modal = document.getElementById("quick-modal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

function addQuickRequest(mode) {
    const modeToUse = mode || quickMode;
    const list = document.getElementById("quick-request-list");
    const t = I18N[currentLang];
    const card = document.createElement("div");
    const id = "quick-" + (++quickSeq);
    card.className = "quick-request-card";
    card.dataset.mode = modeToUse;
    card.dataset.id = id;
    quickAttachments[id] = [];

    const clubs = modeToUse === "record" ? availableRecordClubs : availableReflectionClubs;
    const notesPh = modeToUse === "record" ? t.quick_record_notes_ph : t.quick_reflection_notes_ph;
    const heading = modeToUse === "record" ? t.quick_add_record : t.quick_add_reflection;
    let body = `
        <div class="quick-card-head">
            <div class="quick-card-title">${escapeHtml(heading)} <span>${list.children.length + 1}</span></div>
        </div>
        <div class="quick-form-row">
            <label class="quick-label">${escapeHtml(t.club)}</label>
            <select class="form-select quick-club-select"${clubs.length ? "" : " disabled"}>
                ${optionHtml(clubs)}
            </select>
        </div>`;

    if (modeToUse === "record") {
        body += `
            <div class="quick-form-row">
                <label class="quick-label">${escapeHtml(t.date)}</label>
                <div class="date-picker-wrap">
                    <input type="text" class="form-input quick-date-input" readonly placeholder="${escapeHtml(t.ph_start_date || "Select date")}">
                    <div class="cal-dropdown quick-cal"></div>
                </div>
            </div>
            <div class="quick-form-row">
                <label class="quick-label">${escapeHtml(t.hours_cas)}</label>
                <div class="hours-group quick-hours">
                    <span>C</span><input type="text" class="form-input-sm quick-c" placeholder="0">
                    <span>A</span><input type="text" class="form-input-sm quick-a" placeholder="0">
                    <span>S</span><input type="text" class="form-input-sm quick-s" placeholder="0">
                </div>
            </div>`;
    } else {
        body += `
            <div class="quick-form-row quick-outcome-row">
                <label class="quick-label">${escapeHtml(t.learning_outcomes)}</label>
                <div class="quick-outcomes">
                    ${ALL_OUTCOMES.map((o) => `<label class="quick-outcome"><input type="checkbox" value="${escapeAttr(o)}"> <span>${escapeHtml(o)}</span></label>`).join("")}
                </div>
            </div>`;
    }

    body += `
        <div class="quick-form-row quick-notes-row">
            <label class="quick-label">${escapeHtml(t.quick_notes)}</label>
            <textarea class="form-textarea quick-description" rows="4" placeholder="${escapeAttr(notesPh)}"></textarea>
        </div>
        <div class="quick-form-row quick-file-row">
            <label class="quick-label">${escapeHtml(t.attach_files)}</label>
            <div class="quick-file-control">
                <button type="button" class="quick-file-btn" onclick="pickQuickFiles(this)">
                    <span class="quick-file-icon">+</span><span>${escapeHtml(t.quick_attach || t.attach_files)}</span>
                </button>
                <input type="file" class="quick-file-input" multiple hidden onchange="onQuickFilesPicked(event)"
                       accept=".txt,.md,.csv,.log,.json,.pdf,.docx,.xlsx,.jpg,.jpeg,.png,.webp,.bmp,.gif">
                <div class="quick-attachments"></div>
            </div>
        </div>
        <div class="quick-card-actions">
            <button type="button" class="quick-trash-btn" title="Delete request" onclick="removeQuickRequest(this)">&#128465;</button>
        </div>`;

    card.innerHTML = body;
    list.appendChild(card);
    const ta = card.querySelector(".quick-description");
    ta.dataset.maxlines = "8";
    ta.addEventListener("input", () => autoGrow(ta));
    if (modeToUse === "record") {
        createQuickCalendar(card.querySelector(".quick-cal"), card.querySelector(".quick-date-input"));
    }
    updateQuickRequestNumbers();
}

function removeQuickRequest(btn) {
    const card = btn.closest(".quick-request-card");
    const list = document.getElementById("quick-request-list");
    if (!card || list.children.length <= 1) return;
    delete quickAttachments[card.dataset.id];
    card.remove();
    updateQuickRequestNumbers();
}

function updateQuickRequestNumbers() {
    document.querySelectorAll(".quick-request-card .quick-card-title span").forEach((el, i) => {
        el.textContent = String(i + 1);
    });
}

function pickQuickFiles(btn) {
    const card = btn.closest(".quick-request-card");
    const input = card && card.querySelector(".quick-file-input");
    if (input) input.click();
}

function renderQuickAttachments(card) {
    const box = card.querySelector(".quick-attachments");
    if (!box) return;
    const entries = quickAttachments[card.dataset.id] || [];
    const t = I18N[currentLang];
    box.innerHTML = "";
    entries.forEach((a) => {
        const chip = document.createElement("div");
        chip.className = "chat-chip-file quick-chip-file" + (a.loading ? " is-loading" : "") + (a.error ? " is-error" : "");
        const ico = a.loading ? '<span class="spinner"></span>' : `<span class="cf-ico">${fileIcon(a.name)}</span>`;
        let meta;
        if (a.loading) meta = t.attach_reading || "Reading...";
        else if (a.error) meta = a.note || (t.attach_failed || "Could not read file.");
        else meta = (a.chars || 0) + " chars" + (a.truncated ? " - truncated" : "");
        chip.innerHTML = ico +
            `<span class="cf-body"><span class="cf-name">${escapeHtml(a.name)}</span>` +
            `<span class="cf-meta">${escapeHtml(meta)}</span></span>` +
            `<button class="cf-remove" type="button" title="Remove">&times;</button>`;
        chip.querySelector(".cf-remove").addEventListener("click", () => {
            quickAttachments[card.dataset.id] = (quickAttachments[card.dataset.id] || []).filter((x) => x !== a);
            renderQuickAttachments(card);
        });
        box.appendChild(chip);
    });
}

async function onQuickFilesPicked(e) {
    const input = e.target;
    const card = input.closest(".quick-request-card");
    const files = Array.from(input.files || []);
    input.value = "";
    if (!card || !files.length) return;

    const t = I18N[currentLang];
    const id = card.dataset.id;
    if (!quickAttachments[id]) quickAttachments[id] = [];
    const room = 5 - quickAttachments[id].length;
    if (room <= 0) { alert(t.attach_too_many || "You can attach up to 5 files."); return; }
    const batch = files.slice(0, room);
    if (files.length > room) alert(t.attach_too_many || "You can attach up to 5 files.");

    const entries = batch.map((f) => ({
        id: ++attSeq, name: f.name, text: "", chars: 0, note: "", loading: true, error: false,
    }));
    quickAttachments[id].push(...entries);
    renderQuickAttachments(card);

    const form = new FormData();
    batch.forEach((f) => form.append("files", f));
    try {
        const resp = await fetch("/api/upload", { method: "POST", body: form });
        const data = await resp.json();
        if (data.error) {
            entries.forEach((en) => { en.loading = false; en.error = true; en.note = data.error; });
        } else {
            const results = data.files || [];
            entries.forEach((en, i) => {
                const r = results[i] || {};
                en.loading = false;
                en.text = r.text || "";
                en.chars = r.chars || 0;
                en.truncated = !!r.truncated;
                en.note = r.note || "";
                en.error = !en.text;
            });
        }
    } catch (err) {
        entries.forEach((en) => { en.loading = false; en.error = true; en.note = "Network error"; });
    }
    renderQuickAttachments(card);
}

function createQuickCalendar(cal, input) {
    let viewYear = new Date().getFullYear();
    let viewMonth = new Date().getMonth();

    input.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".cal-dropdown").forEach((c) => { if (c !== cal) c.classList.remove("open"); });
        cal.classList.toggle("open");
        if (cal.classList.contains("open")) render();
    });

    document.addEventListener("click", (e) => {
        if (!cal.contains(e.target) && e.target !== input) cal.classList.remove("open");
    });

    function render() {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();
        let html = `<div class="cal-nav">
            <button class="cal-nav-btn" data-action="prev-year">&laquo;</button>
            <button class="cal-nav-btn" data-action="prev-month">&lsaquo;</button>
            <span class="cal-title">${MONTH_NAMES[viewMonth]} ${viewYear}</span>
            <button class="cal-nav-btn" data-action="next-month">&rsaquo;</button>
            <button class="cal-nav-btn" data-action="next-year">&raquo;</button>
        </div><div class="cal-grid">`;
        ["Mo","Tu","We","Th","Fr","Sa","Su"].forEach((d) => { html += `<div class="cal-header">${d}</div>`; });

        const startOffset = (firstDay + 6) % 7;
        for (let i = 0; i < 42; i++) {
            let dayNum = i - startOffset + 1;
            let inMonth = true;
            let dispYear = viewYear, dispMonth = viewMonth, dispDay;
            if (dayNum < 1) {
                inMonth = false;
                const pm = viewMonth === 0 ? 11 : viewMonth - 1;
                const py = viewMonth === 0 ? viewYear - 1 : viewYear;
                dispDay = daysInPrev + dayNum;
                dispYear = py; dispMonth = pm;
            } else if (dayNum > daysInMonth) {
                inMonth = false;
                const nm = viewMonth === 11 ? 0 : viewMonth + 1;
                const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
                dispDay = dayNum - daysInMonth;
                dispYear = ny; dispMonth = nm;
            } else {
                dispDay = dayNum;
            }
            const dateStr = `${dispYear}/${String(dispMonth + 1).padStart(2, "0")}/${String(dispDay).padStart(2, "0")}`;
            html += `<div class="cal-day cal-allowed${inMonth ? "" : " cal-dim"}" data-date="${dateStr}">${dispDay}</div>`;
        }
        html += `</div>`;
        cal.innerHTML = html;

        cal.querySelectorAll(".cal-nav-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                if (action === "prev-year") viewYear--;
                else if (action === "next-year") viewYear++;
                else if (action === "prev-month") { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } }
                else if (action === "next-month") { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } }
                render();
            });
        });
        cal.querySelectorAll(".cal-day.cal-allowed").forEach((el) => {
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                input.value = el.dataset.date;
                cal.classList.remove("open");
            });
        });
    }
}

async function submitQuickPanel() {
    const t = I18N[currentLang];
    const cards = Array.from(document.querySelectorAll("#quick-request-list .quick-request-card"));
    const quickThinkingEnabled = !!document.getElementById("quick-thinking-toggle")?.checked;
    const requests = [];
    try {
        if (!getQuickClubs().length) throw new Error(t.quick_no_clubs);
        cards.forEach((card) => {
            const club = card.querySelector(".quick-club-select").value;
            const description = card.querySelector(".quick-description").value.trim();
            const attachments = quickAttachments[card.dataset.id] || [];
            if (attachments.some((a) => a.loading)) throw new Error(t.attach_reading || "Reading files...");
            const readyAttachments = attachments
                .filter((a) => a.text && !a.error)
                .map((a) => ({ name: a.name, text: a.text }));
            if (!club) throw new Error(t.quick_no_clubs);
            if (!description && readyAttachments.length === 0) {
                throw new Error(t.quick_need_context || t.quick_need_desc);
            }
            if (quickMode === "record") {
                const date = card.querySelector(".quick-date-input").value;
                if (!date) throw new Error(t.quick_need_date);
                requests.push({
                    club,
                    date,
                    description,
                    attachments: readyAttachments,
                    c_hours: card.querySelector(".quick-c").value.trim() || "0",
                    a_hours: card.querySelector(".quick-a").value.trim() || "0",
                    s_hours: card.querySelector(".quick-s").value.trim() || "0",
                });
            } else {
                const outcomes = Array.from(card.querySelectorAll(".quick-outcome input:checked")).map((cb) => cb.value);
                if (!outcomes.length) throw new Error(t.card_need_outcome);
                requests.push({ club, description, outcomes, attachments: readyAttachments });
            }
        });
    } catch (err) {
        alert(err.message);
        return;
    }

    const btn = document.getElementById("quick-generate-btn");
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>' + (t.chat_thinking || "Thinking...");
    try {
        const resp = await fetch("/api/quick_proposals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kind: quickMode, requests, thinking: quickThinkingEnabled }),
        });
        const data = await resp.json();
        if (!resp.ok || data.error) throw new Error(data.error || "Generation failed.");
        closeQuickPanel();
        (data.proposals || []).forEach((proposal) => renderProposalCard(proposal));
        appendChatBubble("assistant", t.quick_cards_ready);
        hideChatSuggestions();
    } catch (err) {
        alert(err.message);
    } finally {
        btn.disabled = false;
        btn.textContent = t.quick_generate;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeQuickPanel();
        closeIssueModal();
    }
});

// ---- File attachments (uploaded to Qwen-Long file-extract via /api/upload) ----
let pendingAttachments = [];
let attSeq = 0;

function fileIcon(name) {
    const ext = (name.split(".").pop() || "").toLowerCase();
    if (["jpg", "jpeg", "png", "webp", "bmp", "gif"].includes(ext)) return "🖼️";
    if (ext === "pdf") return "📕";
    if (ext === "docx") return "📄";
    if (["xlsx", "csv"].includes(ext)) return "📊";
    return "📄";
}


// ---- Issue reporting ----
const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/nagasakisoyo090209@gmail.com";
const ISSUE_MAX_FILES = 5;
const ISSUE_MAX_FILE_BYTES = 10 * 1024 * 1024;
let issueFiles = [];

function setIssueStatus(message, kind = "") {
    const status = document.getElementById("issue-status");
    if (!status) return;
    status.textContent = message || "";
    status.className = "report-status" + (kind ? " is-" + kind : "");
}

function openIssueModal() {
    const modal = document.getElementById("issue-modal");
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    setIssueStatus("");
    setTimeout(() => document.getElementById("issue-summary")?.focus(), 0);
}

function closeIssueModal() {
    const modal = document.getElementById("issue-modal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

function pickIssueFiles() {
    document.getElementById("issue-file-input")?.click();
}

function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function renderIssueAttachments() {
    const box = document.getElementById("issue-attachments");
    if (!box) return;
    box.innerHTML = "";
    issueFiles.forEach((file, index) => {
        const chip = document.createElement("div");
        chip.className = "chat-chip-file quick-chip-file";
        chip.innerHTML = `<span class="cf-ico">${fileIcon(file.name)}</span>` +
            `<span class="cf-body"><span class="cf-name">${escapeHtml(file.name)}</span>` +
            `<span class="cf-meta">${escapeHtml(formatBytes(file.size))}</span></span>` +
            `<button class="cf-remove" type="button" title="Remove">x</button>`;
        chip.querySelector(".cf-remove").addEventListener("click", () => {
            issueFiles.splice(index, 1);
            renderIssueAttachments();
        });
        box.appendChild(chip);
    });
}

function onIssueFilesPicked(e) {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";
    if (!selected.length) return;
    const t = I18N[currentLang];
    const room = ISSUE_MAX_FILES - issueFiles.length;
    if (room <= 0) {
        alert(t.issue_too_many || "You can attach up to 5 files.");
        return;
    }
    if (selected.length > room) alert(t.issue_too_many || "You can attach up to 5 files.");
    selected.slice(0, room).forEach((file) => {
        if (file.size > ISSUE_MAX_FILE_BYTES) {
            alert((t.issue_file_too_large || "Each attachment must be 10 MB or smaller.") + "\n" + file.name);
            return;
        }
        issueFiles.push(file);
    });
    renderIssueAttachments();
}

async function submitIssueReport(e) {
    e.preventDefault();
    const t = I18N[currentLang];
    const form = document.getElementById("issue-form");
    const button = document.getElementById("issue-submit-btn");
    const summary = document.getElementById("issue-summary")?.value.trim() || "";
    const details = document.getElementById("issue-details")?.value.trim() || "";
    if (!summary || !details) {
        setIssueStatus(t.issue_required || "Please include a summary and details.", "error");
        return;
    }

    const category = document.getElementById("issue-category")?.value || "Bug";
    const contact = document.getElementById("issue-contact")?.value.trim() || "";
    const data = new FormData();
    data.set("_subject", `[CAS Monster Issue] ${category}: ${summary.slice(0, 80)}`);
    data.set("_template", "table");
    data.set("_captcha", "false");
    data.set("category", category);
    data.set("summary", summary);
    data.set("details", details);
    data.set("contact", contact || "Not provided");
    data.set("page_url", window.location.href);
    data.set("user_agent", navigator.userAgent || "");
    data.set("message", `Category: ${category}\nSummary: ${summary}\nContact: ${contact || "Not provided"}\nPage: ${window.location.href}\n\nDetails:\n${details}`);
    if (contact) data.set("email", contact);
    issueFiles.forEach((file) => data.append("attachment", file));

    button.disabled = true;
    setIssueStatus(t.issue_sending || "Sending report...");
    try {
        const resp = await fetch(FORM_SUBMIT_ENDPOINT, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: data,
        });
        const result = await resp.json().catch(() => ({}));
        if (!resp.ok || result.success === "false" || result.success === false) {
            throw new Error(result.message || "Could not send report.");
        }
        form.reset();
        issueFiles = [];
        renderIssueAttachments();
        setIssueStatus(t.issue_sent || "Report submitted. If this is the first submission, check the confirmation email.", "success");
    } catch (err) {
        setIssueStatus(err.message || "Could not send report.", "error");
    } finally {
        button.disabled = false;
    }
}

function toggleAttachMenu(e) {
    e.stopPropagation();
    document.getElementById("chat-attach-menu").classList.toggle("open");
}

document.addEventListener("click", (e) => {
    const menu = document.getElementById("chat-attach-menu");
    const btn = document.getElementById("chat-plus-btn");
    if (menu && !menu.contains(e.target) && e.target !== btn) menu.classList.remove("open");
});

function pickFiles() {
    document.getElementById("chat-attach-menu").classList.remove("open");
    document.getElementById("chat-file-input").click();
}

function renderAttachments() {
    const c = document.getElementById("chat-attachments");
    if (!c) return;
    const t = I18N[currentLang];
    c.innerHTML = "";
    pendingAttachments.forEach((a) => {
        const chip = document.createElement("div");
        chip.className = "chat-chip-file" + (a.loading ? " is-loading" : "") + (a.error ? " is-error" : "");
        const ico = a.loading ? '<span class="spinner"></span>' : `<span class="cf-ico">${fileIcon(a.name)}</span>`;
        let meta;
        if (a.loading) meta = t.attach_reading || "Reading…";
        else if (a.error) meta = a.note || (t.attach_failed || "Could not read file.");
        else meta = (a.chars || 0) + " chars" + (a.truncated ? " • truncated" : "");
        chip.innerHTML = ico +
            `<span class="cf-body"><span class="cf-name">${escapeHtml(a.name)}</span>` +
            `<span class="cf-meta">${escapeHtml(meta)}</span></span>` +
            `<button class="cf-remove" type="button" title="Remove">×</button>`;
        chip.querySelector(".cf-remove").addEventListener("click", () => {
            pendingAttachments = pendingAttachments.filter((x) => x !== a);
            renderAttachments();
        });
        c.appendChild(chip);
    });
}

async function onFilesPicked(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    const t = I18N[currentLang];
    const room = 5 - pendingAttachments.length;
    if (room <= 0) { alert(t.attach_too_many || "You can attach up to 5 files."); return; }
    const batch = files.slice(0, room);
    if (files.length > room) alert(t.attach_too_many || "You can attach up to 5 files.");

    const entries = batch.map((f) => ({
        id: ++attSeq, name: f.name, text: "", chars: 0, note: "", loading: true, error: false,
    }));
    pendingAttachments.push(...entries);
    renderAttachments();

    const form = new FormData();
    batch.forEach((f) => form.append("files", f));
    try {
        const resp = await fetch("/api/upload", { method: "POST", body: form });
        const data = await resp.json();
        if (data.error) {
            entries.forEach((en) => { en.loading = false; en.error = true; en.note = data.error; });
        } else {
            const results = data.files || [];
            entries.forEach((en, i) => {
                const r = results[i] || {};
                en.loading = false;
                en.text = r.text || "";
                en.chars = r.chars || 0;
                en.truncated = !!r.truncated;
                en.note = r.note || "";
                en.error = !en.text;
            });
        }
    } catch (err) {
        entries.forEach((en) => { en.loading = false; en.error = true; en.note = "Network error"; });
    }
    renderAttachments();
}

async function sendChat() {
    const input = document.getElementById("chat-input");
    const typed = input.value.trim();
    const sentAttachments = pendingAttachments
        .filter((a) => a.text && !a.loading)
        .map((a) => ({ name: a.name, text: a.text }));
    if (!typed && sentAttachments.length === 0) return;

    const t = I18N[currentLang];
    const message = typed || (t.attach_default || "Please read the attached file(s).");

    input.value = "";
    autoGrowInput(input);
    hideChatSuggestions();
    const tagNames = sentAttachments.map((a) => a.name);
    pendingAttachments = [];
    renderAttachments();

    const userBubble = appendChatBubble("user", message);
    if (tagNames.length) {
        const tags = document.createElement("div");
        tags.className = "chat-attach-tags";
        tags.textContent = "📎 " + tagNames.join(", ");
        const inner = userBubble.querySelector(".chat-bubble-inner");
        if (inner) inner.appendChild(tags);
    }

    const btn = document.getElementById("btn-send-chat");
    btn.disabled = true;
    input.disabled = true;

    const thinkingEnabled = isChatThinkingEnabled();
    const thinkingBubble = appendChatBubble("assistant thinking", t.chat_thinking || "Thinking...", true);

    try {
        const cleanHistory = chatHistory.filter((h) =>
            h && (h.role === "user" || h.role === "assistant") &&
            typeof h.content === "string" && h.content.trim()
        );
        const resp = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                history: cleanHistory,
                clubs: availableClubs,
                attachments: sentAttachments,
                thinking: thinkingEnabled,
            }),
        });
        const data = await resp.json();
        thinkingBubble.remove();
        chatHistory.push({ role: "user", content: message });
        if (data.error) {
            appendChatBubble("assistant", "Error: " + data.error);
        } else {
            if (thinkingEnabled && data.reasoning) {
                appendThinkingContent(data.reasoning);
            }
            if (data.reply) {
                appendChatBubble("assistant", data.reply);
                chatHistory.push({ role: "assistant", content: data.reply, reasoning_content: data.reasoning || "" });
            }
            if (data.proposal) {
                renderProposalCard(data.proposal);
                chatHistory.push({
                    role: "assistant",
                    content: "[Showed a " + data.proposal.action + " card for the user to approve.]",
                    reasoning_content: data.reasoning || "",
                });
            } else if (!data.reply) {
                appendChatBubble("assistant", I18N[currentLang].chat_empty || "…");
            }
        }
        if (chatHistory.length > CHAT_HISTORY_LIMIT) chatHistory = chatHistory.slice(-CHAT_HISTORY_LIMIT);
    } catch (e) {
        thinkingBubble.remove();
        appendChatBubble("assistant", "Network error: " + e.message);
    } finally {
        btn.disabled = false;
        input.disabled = false;
        input.focus();
    }
}

// ---- Gemini-style approval cards ----
let cardSeq = 0;
const cardProposals = {}; // id -> proposal
const ALL_OUTCOMES = ["Awareness", "Challenge", "Initiative", "Collaboration",
                      "Commitment", "Global Value", "Ethics", "New Skills"];

function esc(s) {
    return escapeHtml(String(s == null ? "" : s));
}

function renderProposalCard(p) {
    const t = I18N[currentLang];
    const id = "cas-card-" + (++cardSeq);
    cardProposals[id] = p;
    const container = document.getElementById("chat-messages");
    const card = document.createElement("div");
    card.className = "cas-card";
    card.id = id;

    let title = "", icon = "📝", fields = "", content = "";
    const fr = (k, v) =>
        `<div class="cas-field"><div class="cas-field-key">${esc(k)}</div>` +
        `<div class="cas-field-val">${esc(v)}</div></div>`;
    const area = (label, cls, value) =>
        `<div class="cas-content-label">${esc(label)}</div>` +
        `<textarea class="cas-content-box ${cls}">${esc(value)}</textarea>`;

    if (p.action === "record") {
        title = t.card_record_title; icon = "📝";
        const pr = p.params;
        fields = fr(t.card_club, pr.club_display || pr.club) + fr(t.card_date, pr.date) + fr(t.card_theme, pr.theme) +
                 fr(t.card_hours, `${pr.c_hours} / ${pr.a_hours} / ${pr.s_hours}`);
        content = area(t.card_description, "cas-desc", p.content.description);
    } else if (p.action === "reflection") {
        title = t.card_reflection_title; icon = "💭";
        const pr = p.params;
        fields = fr(t.card_club, pr.club_display || pr.club);
        // All outcomes listed; the ones the model picked are pre-ticked, the rest
        // empty, so the user can adjust before approving.
        const picked = new Set(pr.outcomes || []);
        content += `<div class="cas-content-label">${esc(t.card_outcomes)}</div><div class="cas-outcomes">`;
        ALL_OUTCOMES.forEach((o) => {
            content += `<label class="cas-outcome"><input type="checkbox" class="cas-outcome-cb" value="${esc(o)}"` +
                       `${picked.has(o) ? " checked" : ""}> <span>${esc(o)}</span></label>`;
        });
        content += `</div>`;
        (pr.titles || []).forEach((tt, i) => {
            content += `<div class="cas-content-label">${esc(t.card_titles)} ${i + 1}: ${esc(tt)}</div>`;
            content += `<textarea class="cas-content-box cas-refl-summary" data-i="${i}" rows="2">` +
                       esc((p.content.summaries || [])[i] || "") + `</textarea>`;
            content += `<textarea class="cas-content-box cas-refl-content" data-i="${i}">` +
                       esc((p.content.contents || [])[i] || "") + `</textarea>`;
        });
    } else if (p.action === "batch") {
        title = t.card_batch_title; icon = "🗓️";
        const pr = p.params;
        fields = fr(t.card_club, pr.club_display || pr.club) + fr(t.card_weekday, pr.weekday) +
                 fr(t.card_range, `${pr.start_date} → ${pr.end_date}`) +
                 fr(t.card_weeks, p.content.week_count) +
                 (pr.periodic ? fr(t.card_periodic, pr.periodic) : "") +
                 fr(t.card_hours, `${pr.c_hours} / ${pr.a_hours} / ${pr.s_hours}`);
        content = `<div class="cas-content-label">${esc(t.card_sample)}: ${esc(p.content.sample_theme)}</div>` +
                  `<div class="cas-content-box">${esc(p.content.sample_desc)}</div>` +
                  `<div class="cas-card-status">${esc(t.card_batch_note)}</div>`;
    }

    card.innerHTML =
        `<div class="cas-card-head"><span class="cas-card-icon">${icon}</span>` +
        `<span>${esc(title)}</span>` +
        `<span class="cas-card-badge">${esc(t.card_badge_review)}</span></div>` +
        `<div class="cas-card-body">${fields}${content}</div>` +
        `<div class="cas-card-actions">` +
        `<button class="btn cas-btn-approve" onclick="approveCard('${id}')">${esc(t.card_approve)}</button>` +
        `<button class="btn cas-btn-cancel" onclick="cancelCard('${id}')">${esc(t.card_cancel)}</button>` +
        `</div>`;

    container.appendChild(card);
    // Auto-size content textareas: descriptions/reflections grow to 10 lines then
    // scroll; short summaries cap at 4 lines.
    card.querySelectorAll("textarea.cas-content-box").forEach((ta) => {
        ta.dataset.maxlines = ta.classList.contains("cas-refl-summary") ? "4" : "10";
        autoGrow(ta);
        ta.addEventListener("input", () => autoGrow(ta));
    });
    container.scrollTop = container.scrollHeight;
}

function setCardBadge(card, text, klass) {
    const badge = card.querySelector(".cas-card-badge");
    if (badge) badge.textContent = text;
    if (klass) card.classList.add(klass);
}

function approveCard(id) {
    const p = cardProposals[id];
    const card = document.getElementById(id);
    if (!p || !card) return;
    if (!CURRENT_USER || !CURRENT_PW) { alert(I18N[currentLang].card_need_login); return; }
    const t = I18N[currentLang];
    const acc = { username: CURRENT_USER, password: CURRENT_PW };

    if (p.action === "record") {
        const desc = card.querySelector(".cas-desc").value;
        socket.emit("run_record", { ...acc, ...p.params, description: desc });
        submittingCards.record.push(id);
    } else if (p.action === "reflection") {
        const outcomes = Array.from(card.querySelectorAll(".cas-outcome-cb:checked")).map((e) => e.value);
        if (outcomes.length === 0) { alert(t.card_need_outcome); return; }
        const summaries = Array.from(card.querySelectorAll(".cas-refl-summary")).map((e) => e.value);
        const contents = Array.from(card.querySelectorAll(".cas-refl-content")).map((e) => e.value);
        socket.emit("run_reflection", {
            ...acc,
            club: p.params.club,
            club_desc: p.params.club_desc,
            titles: p.params.titles,
            desc_lines: p.params.desc_lines,
            outcomes,
            summaries,
            contents,
        });
        submittingCards.reflection.push(id);
    } else if (p.action === "batch") {
        socket.emit("run_batch", { ...acc, ...p.params });
        submittingCards.batch.push(id);
    }

    setButtonsRunning(true);
    // Lock the card into a submitting state.
    card.querySelectorAll("button, textarea, input").forEach((e) => (e.disabled = true));
    setCardBadge(card, t.card_badge_running, "is-running");
    let status = card.querySelector(".cas-card-status");
    if (!status) {
        status = document.createElement("div");
        status.className = "cas-card-status";
        card.appendChild(status);
    }
    status.innerHTML = '<span class="spinner"></span>' + (t.card_submitting || "Submitting…");
}

function markCardDone(id) {
    const card = document.getElementById(id);
    if (!card) return;
    const t = I18N[currentLang];
    setCardBadge(card, t.card_badge_done, "is-done");
    let status = card.querySelector(".cas-card-status");
    if (!status) {
        status = document.createElement("div");
        status.className = "cas-card-status";
        card.appendChild(status);
    }
    status.textContent = "✓ " + (t.card_done || "Submitted.");
}

function cancelCard(id) {
    const card = document.getElementById(id);
    if (!card) return;
    const t = I18N[currentLang];
    delete cardProposals[id];
    card.querySelectorAll("button, textarea, input").forEach((e) => (e.disabled = true));
    setCardBadge(card, t.card_badge_cancelled, "is-cancelled");
    let status = card.querySelector(".cas-card-status");
    if (!status) {
        status = document.createElement("div");
        status.className = "cas-card-status";
        card.appendChild(status);
    }
    status.textContent = t.card_cancelled_msg || "Cancelled.";
}
