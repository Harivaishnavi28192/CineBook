const path = require("path");
const PptxGenJS = require(path.join(__dirname, "server-app", "node_modules", "pptxgenjs"));

async function createHumanizedPresentation() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Christy Vincelet A & Hari Vaishnavi";
  pptx.company = "Department of Computer Science & Engineering";
  pptx.title = "CineBook — Movie Ticket Booking System";
  pptx.subject = "Final Project Presentation";

  // Brand Palette
  const BG_DARK = "090B0E";      // Deep Obsidian Slate
  const CARD_BG = "12161E";      // Card Surface
  const CARD_BG_ALT = "171D27";  // Lighter Card Surface
  const BRAND = "FF6B2B";        // Radiant Sunset Orange
  const AMBER = "F59E0B";        // Golden Amber
  const EMERALD = "10B981";      // Success Green
  const TEXT_MAIN = "F8FAFC";    // Bright Crisp White
  const TEXT_SUB = "94A3B8";     // Muted Gray
  const BORDER = "27313F";       // Card Borders

  // Standardized slide header helper
  function createSlide(title, badge = "CINEBOOK PROJECT") {
    const slide = pptx.addSlide();
    slide.background = { color: BG_DARK };

    // Badge Pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 0.45,
      w: 3.2,
      h: 0.32,
      rectRadius: 0.16,
      fill: { color: CARD_BG_ALT },
      line: { color: BRAND, width: 1 }
    });

    slide.addText(badge.toUpperCase(), {
      x: 0.8,
      y: 0.45,
      w: 3.2,
      h: 0.32,
      align: "center",
      fontFace: "Arial",
      fontSize: 9,
      bold: true,
      color: BRAND,
      charSpacing: 1.5
    });

    // Slide Title
    slide.addText(title, {
      x: 0.8,
      y: 0.85,
      w: 11.5,
      h: 0.65,
      fontFace: "Georgia",
      fontSize: 26,
      bold: true,
      color: TEXT_MAIN
    });

    // Footer Bar
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8,
      y: 7.0,
      w: 11.7,
      h: 0,
      line: { color: BORDER, width: 1 }
    });

    slide.addText("Christy Vincelet A (URK24CS1199)   ·   Hari Vaishnavi (URK24CS1238)", {
      x: 0.8,
      y: 7.05,
      w: 8.0,
      h: 0.3,
      fontFace: "Arial",
      fontSize: 10,
      color: TEXT_SUB
    });

    slide.addText("CineBook · Full-Stack MERN Project", {
      x: 8.5,
      y: 7.05,
      w: 4.0,
      h: 0.3,
      align: "right",
      fontFace: "Arial",
      fontSize: 10,
      bold: true,
      color: BRAND
    });

    return slide;
  }

  // =========================================================================
  // SLIDE 1: Title Slide (Bold & Friendly)
  // =========================================================================
  const s1 = pptx.addSlide();
  s1.background = { color: BG_DARK };

  // Center Hero Card
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 0.9,
    w: 11.3,
    h: 5.6,
    rectRadius: 0.25,
    fill: { color: CARD_BG },
    line: { color: BORDER, width: 1.5 }
  });

  s1.addShape(pptx.ShapeType.roundRect, {
    x: 1.6,
    y: 1.4,
    w: 3.4,
    h: 0.35,
    rectRadius: 0.17,
    fill: { color: CARD_BG_ALT },
    line: { color: BRAND, width: 1 }
  });

  s1.addText("★ FINAL PROJECT PRESENTATION", {
    x: 1.6,
    y: 1.4,
    w: 3.4,
    h: 0.35,
    align: "center",
    fontFace: "Arial",
    fontSize: 9.5,
    bold: true,
    color: BRAND,
    charSpacing: 1.5
  });

  s1.addText([
    { text: "Cine", options: { color: TEXT_MAIN, bold: true } },
    { text: "Book", options: { color: BRAND, bold: true, italic: true } }
  ], {
    x: 1.6,
    y: 1.9,
    w: 8.0,
    h: 1.1,
    fontFace: "Georgia",
    fontSize: 54
  });

  s1.addText("A Modern, Real-Time Movie Ticket Booking System", {
    x: 1.6,
    y: 3.05,
    w: 10.0,
    h: 0.5,
    fontFace: "Arial",
    fontSize: 20,
    bold: true,
    color: AMBER
  });

  s1.addText("Built with React 19, Node.js, Express, and MongoDB — designed with real-time seat synchronization and a warm, editorial user experience.", {
    x: 1.6,
    y: 3.65,
    w: 10.0,
    h: 0.6,
    fontFace: "Arial",
    fontSize: 13,
    color: TEXT_SUB
  });

  // Presenter 1
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 1.6,
    y: 4.6,
    w: 4.8,
    h: 1.4,
    rectRadius: 0.15,
    fill: { color: CARD_BG_ALT },
    line: { color: BORDER, width: 1 }
  });
  s1.addText("Christy Vincelet A", { x: 1.9, y: 4.85, w: 4.2, h: 0.35, fontFace: "Georgia", fontSize: 16, bold: true, color: TEXT_MAIN });
  s1.addText("Register Number: URK24CS1199\nFrontend & UI/UX Engineering", { x: 1.9, y: 5.25, w: 4.2, h: 0.55, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });

  // Presenter 2
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 4.6,
    w: 4.8,
    h: 1.4,
    rectRadius: 0.15,
    fill: { color: CARD_BG_ALT },
    line: { color: BORDER, width: 1 }
  });
  s1.addText("Hari Vaishnavi", { x: 7.1, y: 4.85, w: 4.2, h: 0.35, fontFace: "Georgia", fontSize: 16, bold: true, color: TEXT_MAIN });
  s1.addText("Register Number: URK24CS1238\nBackend APIs & Database Architecture", { x: 7.1, y: 5.25, w: 4.2, h: 0.55, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });

  // =========================================================================
  // SLIDE 2: Why We Built CineBook (The Human Story)
  // =========================================================================
  const s2 = createSlide("Why CineBook? The Problem We Set Out to Solve", "01. THE PROBLEM & VISION");

  const s2Points = [
    {
      title: "Booking Tickets Shouldn't Be Clunky",
      desc: "Most cinema websites feel slow, crowded with ads, and require full page reloads every time you click a filter or check seat times.",
      tag: "THE FRUSTRATION",
      accent: "EF4444"
    },
    {
      title: "Seats Shouldn't Double-Book",
      desc: "When two users book the same movie, outdated seat counts often cause booking conflicts. Seat stock must update live and accurately.",
      tag: "THE TECHNICAL GAP",
      accent: AMBER
    },
    {
      title: "Cancellations Should Be Effortless",
      desc: "Cancelling shouldn't take a support ticket. One click should cancel your pass and return the seats straight back to the box office.",
      tag: "THE CINEBOOK SOLUTION",
      accent: BRAND
    }
  ];

  s2Points.forEach((p, i) => {
    const xPos = 0.8 + i * 4.0;
    s2.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 3.7,
      h: 4.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: i === 2 ? BRAND : BORDER, width: i === 2 ? 1.5 : 1 }
    });

    s2.addText(p.tag, { x: xPos + 0.3, y: 2.0, w: 3.1, h: 0.3, fontFace: "Arial", fontSize: 10, bold: true, color: p.accent, charSpacing: 1.2 });
    s2.addText(p.title, { x: xPos + 0.3, y: 2.45, w: 3.1, h: 0.8, fontFace: "Georgia", fontSize: 18, bold: true, color: TEXT_MAIN });
    s2.addShape(pptx.ShapeType.line, { x: xPos + 0.3, y: 3.35, w: 3.1, h: 0, line: { color: BORDER, width: 1 } });
    s2.addText(p.desc, { x: xPos + 0.3, y: 3.6, w: 3.1, h: 2.6, fontFace: "Arial", fontSize: 13, color: TEXT_SUB, lineSpacingMultiple: 1.25 });
  });

  // =========================================================================
  // SLIDE 3: What CineBook Does (Core Features in Plain English)
  // =========================================================================
  const s3 = createSlide("What Can Users and Admins Do in CineBook?", "02. KEY FEATURES");

  const s3Cards = [
    {
      role: "FOR MOVIEGOERS",
      accent: BRAND,
      items: [
        "Browse Now-Showing Movies: Filter by genre, language, or sort by duration.",
        "Quick 3-Step Booking: Choose film $\\rightarrow$ Pick showtime $\\rightarrow$ Select seats.",
        "Instant Digital Pass: Generates a sleek admission ticket with a barcode.",
        "One-Click Free Cancellation: Cancel any active pass and see seats returned."
      ]
    },
    {
      role: "FOR THEATRE ADMINS",
      accent: AMBER,
      items: [
        "Add New Titles: Enter title, genre, runtime, and total theatre seat capacity.",
        "Live Poster Preview: Movie card gradient previews in real-time as you type.",
        "Edit on the Fly: Update movie timings, languages, or remaining seats instantly.",
        "Clean Cascade Deletions: Removing a movie cleans up its old bookings safely."
      ]
    }
  ];

  s3Cards.forEach((c, i) => {
    const xPos = 0.8 + i * 6.0;
    s3.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 5.7,
      h: 4.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: c.accent, width: 1.2 }
    });

    s3.addText(c.role, { x: xPos + 0.4, y: 2.0, w: 4.9, h: 0.35, fontFace: "Arial", fontSize: 11, bold: true, color: c.accent, charSpacing: 1.2 });
    s3.addShape(pptx.ShapeType.line, { x: xPos + 0.4, y: 2.45, w: 4.9, h: 0, line: { color: BORDER, width: 1 } });

    const textBullets = c.items.map((it) => {
      const [headline, detail] = it.split(":");
      return [
        { text: `• ${headline}:\n`, options: { bold: true, color: TEXT_MAIN, fontSize: 13 } },
        { text: `   ${detail}\n\n`, options: { color: TEXT_SUB, fontSize: 12 } }
      ];
    }).flat();

    s3.addText(textBullets, { x: xPos + 0.4, y: 2.65, w: 4.9, h: 3.7, fontFace: "Arial" });
  });

  // =========================================================================
  // SLIDE 4: Architecture (Clear 3-Tier Diagram)
  // =========================================================================
  const s4 = createSlide("How It All Connects: 3-Tier System Architecture", "03. ARCHITECTURE");

  const s4Tiers = [
    {
      num: "1",
      name: "Frontend (Client)",
      tech: "React 19 + Vite",
      points: [
        "Single-Page Application: Fast transitions with zero page reloads",
        "Axios HTTP Client: Sends asynchronous JSON requests",
        "Reactive UI: Instant feedback with toasts and animated counters"
      ],
      accent: BRAND
    },
    {
      num: "2",
      name: "Backend (Server)",
      tech: "Node.js + Express 5",
      points: [
        "9 REST Endpoints: Handles all CRUD logic cleanly",
        "Seat Stock Validation: Checks available seats before confirming",
        "CORS Enabled: Connects smoothly to frontend on port 5173"
      ],
      accent: AMBER
    },
    {
      num: "3",
      name: "Database (Storage)",
      tech: "MongoDB + Mongoose",
      points: [
        "Local Daemon: Runs reliably on port 27017",
        "Two Collections: 'movies' and 'bookings'",
        "Live Verification: Inspectable via MongoDB Compass and CLI"
      ],
      accent: EMERALD
    }
  ];

  s4Tiers.forEach((t, i) => {
    const xPos = 0.8 + i * 4.0;
    s4.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 3.7,
      h: 4.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: t.accent, width: 1.2 }
    });

    s4.addText(`TIER 0${t.num}`, { x: xPos + 0.3, y: 2.0, w: 3.1, h: 0.3, fontFace: "Arial", fontSize: 10, bold: true, color: t.accent, charSpacing: 1.2 });
    s4.addText(t.name, { x: xPos + 0.3, y: 2.35, w: 3.1, h: 0.4, fontFace: "Georgia", fontSize: 17, bold: true, color: TEXT_MAIN });
    s4.addText(t.tech, { x: xPos + 0.3, y: 2.8, w: 3.1, h: 0.3, fontFace: "Arial", fontSize: 12, bold: true, color: AMBER });

    s4.addShape(pptx.ShapeType.line, { x: xPos + 0.3, y: 3.2, w: 3.1, h: 0, line: { color: BORDER, width: 1 } });

    const bulletList = t.points.map((pt) => ({ text: `• ${pt}\n\n`, options: { color: TEXT_SUB, fontSize: 12 } }));
    s4.addText(bulletList, { x: xPos + 0.3, y: 3.4, w: 3.1, h: 3.0, fontFace: "Arial" });
  });

  // =========================================================================
  // SLIDE 5: Database Design Made Simple
  // =========================================================================
  const s5 = createSlide("Database Design: Two Clean Collections in MongoDB", "04. DATA PERSISTENCE");

  // Movies Collection Card
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.7,
    h: 4.9,
    rectRadius: 0.2,
    fill: { color: CARD_BG },
    line: { color: BRAND, width: 1.2 }
  });

  s5.addText("1. 'movies' COLLECTION", { x: 1.1, y: 2.0, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: BRAND, charSpacing: 1.2 });
  s5.addText("Stores film listings and real-time seat inventory", { x: 1.1, y: 2.35, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });
  s5.addShape(pptx.ShapeType.line, { x: 1.1, y: 2.75, w: 5.1, h: 0, line: { color: BORDER, width: 1 } });

  const movieBullets = [
    { text: "• movieId (String, Unique): ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Unique film code (e.g., M101, M102)\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• title (String, Required): ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Name of the movie (e.g., Leo, Inception)\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• genre & language (String): ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Action, Sci-Fi | Tamil, English, Hindi\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• duration (Number): ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Runtime in minutes (formatted as '2h 28m' on UI)\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• availableSeats (Number): ", options: { bold: true, color: BRAND, fontSize: 12 } },
    { text: "Live seat count, automatically decrements and restores", options: { color: TEXT_SUB, fontSize: 12 } }
  ];
  s5.addText(movieBullets, { x: 1.1, y: 2.95, w: 5.1, h: 3.5, fontFace: "Arial" });

  // Bookings Collection Card
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 4.9,
    rectRadius: 0.2,
    fill: { color: CARD_BG },
    line: { color: AMBER, width: 1.2 }
  });

  s5.addText("2. 'bookings' COLLECTION", { x: 7.1, y: 2.0, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: AMBER, charSpacing: 1.2 });
  s5.addText("Stores customer reservations and ticket states", { x: 7.1, y: 2.35, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });
  s5.addShape(pptx.ShapeType.line, { x: 7.1, y: 2.75, w: 5.1, h: 0, line: { color: BORDER, width: 1 } });

  const bookingBullets = [
    { text: "• _id (ObjectId): ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Used to generate clean ticket codes (e.g., TKT-F350A6)\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• customerName (String): ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Guest name printed on the digital pass\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• movieId & movieTitle: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Links reservation directly to the scheduled movie\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• showtime & seats: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12 } },
    { text: "Selected show slot (e.g. 6:00 PM) and quantity booked\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "• status (String): ", options: { bold: true, color: AMBER, fontSize: 12 } },
    { text: "Starts as 'Booked', switches to 'Cancelled' upon cancel", options: { color: TEXT_SUB, fontSize: 12 } }
  ];
  s5.addText(bookingBullets, { x: 7.1, y: 2.95, w: 5.1, h: 3.5, fontFace: "Arial" });

  // =========================================================================
  // SLIDE 6: Backend APIs (Grouped Clearly)
  // =========================================================================
  const s6 = createSlide("Backend RESTful APIs: 9 Clean Routes", "05. API SPECIFICATIONS");

  const apiGroups = [
    {
      group: "MOVIE MANAGEMENT (ADMIN)",
      accent: BRAND,
      routes: [
        { method: "POST", path: "/api/addMovie", desc: "Adds a new film with seat capacity" },
        { method: "GET", path: "/api/viewMovies", desc: "Fetches all movies currently showing" },
        { method: "GET", path: "/api/searchMovies?title=...", desc: "Searches titles with regex" },
        { method: "POST", path: "/api/updateMovie", desc: "Updates movie info & seat limits" },
        { method: "POST", path: "/api/deleteMovie", desc: "Deletes movie & cascades cleanup" }
      ]
    },
    {
      group: "TICKETING & RESERVATIONS",
      accent: AMBER,
      routes: [
        { method: "POST", path: "/api/bookTicket", desc: "Validates seats, saves booking, decrements stock" },
        { method: "GET", path: "/api/viewBookings", desc: "Retrieves complete booking ledger" },
        { method: "POST", path: "/api/cancelBooking", desc: "Marks status 'Cancelled' & restores seats" },
        { method: "POST", path: "/api/deleteBooking", desc: "Permanently removes booking record" }
      ]
    }
  ];

  apiGroups.forEach((g, i) => {
    const xPos = 0.8 + i * 6.0;
    s6.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 5.7,
      h: 4.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: BORDER, width: 1 }
    });

    s6.addText(g.group, { x: xPos + 0.35, y: 2.0, w: 5.0, h: 0.35, fontFace: "Arial", fontSize: 11, bold: true, color: g.accent, charSpacing: 1.2 });
    s6.addShape(pptx.ShapeType.line, { x: xPos + 0.35, y: 2.45, w: 5.0, h: 0, line: { color: BORDER, width: 1 } });

    const routeText = g.routes.map((r) => [
      { text: `${r.method} `, options: { bold: true, color: r.method === "POST" ? BRAND : "38BDF8", fontSize: 11 } },
      { text: `${r.path}\n`, options: { fontFace: "Courier New", bold: true, color: TEXT_MAIN, fontSize: 11 } },
      { text: `   ${r.desc}\n\n`, options: { fontFace: "Arial", color: TEXT_SUB, fontSize: 10.5 } }
    ]).flat();

    s6.addText(routeText, { x: xPos + 0.35, y: 2.65, w: 5.0, h: 3.8 });
  });

  // =========================================================================
  // SLIDE 7: How Booking Works (Step-by-Step Flow)
  // =========================================================================
  const s7 = createSlide("The Booking Journey: From Selection to Digital Pass", "06. WORKFLOWS");

  const s7Steps = [
    { num: "01", title: "Patron Selects Show", desc: "Picks a movie, selects a showtime (10 AM / 1:30 PM / 6 PM / 9:30 PM), and inputs seat count." },
    { num: "02", title: "Axios Sends Request", desc: "React dispatches an async POST request with the booking details to Express on port 7000." },
    { num: "03", title: "Capacity Validation", desc: "Server checks MongoDB: are there enough availableSeats left? If yes, it proceeds." },
    { num: "04", title: "Atomic Decrement", desc: "Movie seats decrement by the requested count and a new Booking document is saved in MongoDB." },
    { num: "05", title: "Pass Issued Instantly", desc: "Client displays a verified ticket pass with barcode, seat count, and showtime without page reload." }
  ];

  s7Steps.forEach((st, i) => {
    const xPos = 0.8 + i * 2.38;
    s7.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 2.2,
      h: 4.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: i === 2 || i === 3 ? BRAND : BORDER, width: i === 2 || i === 3 ? 1.5 : 1 }
    });

    s7.addText(`STEP ${st.num}`, { x: xPos + 0.2, y: 2.0, w: 1.8, h: 0.3, fontFace: "Arial", fontSize: 10, bold: true, color: BRAND, charSpacing: 1.2 });
    s7.addText(st.title, { x: xPos + 0.2, y: 2.45, w: 1.8, h: 0.7, fontFace: "Georgia", fontSize: 15, bold: true, color: TEXT_MAIN });
    s7.addShape(pptx.ShapeType.line, { x: xPos + 0.2, y: 3.25, w: 1.8, h: 0, line: { color: BORDER, width: 1 } });
    s7.addText(st.desc, { x: xPos + 0.2, y: 3.5, w: 1.8, h: 2.8, fontFace: "Arial", fontSize: 11.5, color: TEXT_SUB, lineSpacingMultiple: 1.25 });
  });

  // =========================================================================
  // SLIDE 8: How Cancellation Works (Automatic Seat Return)
  // =========================================================================
  const s8 = createSlide("The Cancellation Journey: 1-Click Seat Restitution", "07. WORKFLOWS");

  const s8Cards = [
    {
      stage: "STAGE 1: THE TRIGGER",
      title: "Patron Clicks Cancel",
      desc: "User visits '/bookings', finds their ticket, and clicks 'Cancel'. A confirmation modal pops up to prevent accidental clicks.",
      accent: AMBER
    },
    {
      stage: "STAGE 2: THE RESTITUTION",
      title: "Server Restores Seats",
      desc: "Express marks the booking as 'Cancelled' and automatically adds those seats back to the movie's availableSeats tally.",
      accent: BRAND
    },
    {
      stage: "STAGE 3: THE RESULT",
      title: "Zero Manual Work",
      desc: "The UI immediately shows the badge as 'Cancelled', and the seats are ready for someone else to book. No admin intervention needed.",
      accent: EMERALD
    }
  ];

  s8Cards.forEach((c, i) => {
    const xPos = 0.8 + i * 4.0;
    s8.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 3.7,
      h: 4.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: c.accent, width: 1.2 }
    });

    s8.addText(c.stage, { x: xPos + 0.35, y: 2.05, w: 3.0, h: 0.3, fontFace: "Arial", fontSize: 10, bold: true, color: c.accent, charSpacing: 1.2 });
    s8.addText(c.title, { x: xPos + 0.35, y: 2.5, w: 3.0, h: 0.65, fontFace: "Georgia", fontSize: 18, bold: true, color: TEXT_MAIN });
    s8.addShape(pptx.ShapeType.line, { x: xPos + 0.35, y: 3.3, w: 3.0, h: 0, line: { color: BORDER, width: 1 } });
    s8.addText(c.desc, { x: xPos + 0.35, y: 3.6, w: 3.0, h: 2.7, fontFace: "Arial", fontSize: 13, color: TEXT_SUB, lineSpacingMultiple: 1.3 });
  });

  // =========================================================================
  // SLIDE 9: Design & UX Innovations
  // =========================================================================
  const s9 = createSlide("UI/UX Design: Warm, Editorial & Animated", "08. USER EXPERIENCE");

  const s9Features = [
    { title: "Warm Sunset Palette", desc: "No harsh pure red. We engineered a warm palette of sunset orange (#FF6B2B), amber, and deep obsidian slate." },
    { title: "Editorial Typography", desc: "Combines Google Fonts Fraunces display serif for headlines with DM Sans for crisp readability." },
    { title: "Cinema Preloader", desc: "An animated SVG pulse path with a glowing orange stroke smoothly introduces the site upon first load." },
    { title: "Scroll Reveal Animations", desc: "Elements elevate smoothly into view with custom staggered delays as you scroll down the page." },
    { title: "3D Parallax Hero Ticket", desc: "The featured movie ticket responds to your mouse movements with a smooth 3D tilt perspective." },
    { title: "Live Movie Poster Preview", desc: "When admins type a film title in the manager, a poster card updates with dynamic gradients in real-time." }
  ];

  s9Features.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const xPos = 0.8 + col * 4.0;
    const yPos = 1.7 + row * 2.55;

    s9.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 3.7,
      h: 2.35,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: BORDER, width: 1 }
    });

    s9.addText(f.title, { x: xPos + 0.3, y: yPos + 0.25, w: 3.1, h: 0.4, fontFace: "Georgia", fontSize: 15, bold: true, color: BRAND });
    s9.addText(f.desc, { x: xPos + 0.3, y: yPos + 0.75, w: 3.1, h: 1.4, fontFace: "Arial", fontSize: 11.5, color: TEXT_SUB, lineSpacingMultiple: 1.25 });
  });

  // =========================================================================
  // SLIDE 10: How to Show Database Results in Viva
  // =========================================================================
  const s10 = createSlide("Live Database Verification for Viva & Demonstration", "09. VIVA DEMONSTRATION");

  // Compass GUI Method
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.7,
    h: 4.9,
    rectRadius: 0.2,
    fill: { color: CARD_BG },
    line: { color: BRAND, width: 1.2 }
  });

  s10.addText("METHOD 1: MONGODB COMPASS (GUI)", { x: 1.1, y: 2.0, w: 5.1, h: 0.35, fontFace: "Arial", fontSize: 11, bold: true, color: BRAND, charSpacing: 1.2 });
  s10.addText("Best for visual demonstrations to evaluators", { x: 1.1, y: 2.35, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });
  s10.addShape(pptx.ShapeType.line, { x: 1.1, y: 2.75, w: 5.1, h: 0, line: { color: BORDER, width: 1 } });

  const compassPoints = [
    { text: "1. Connect in One Click: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Open Compass $\\rightarrow$ Connect to localhost:27017.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "2. Open 'moviebooking' Database: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Shows both 'movies' and 'bookings' collections.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "3. Live Real-Time Demo: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Book a ticket on the website $\\rightarrow$ Click Refresh in Compass $\\rightarrow$ The new document appears instantly.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "4. Cancellation Verification: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Cancel a pass on the site $\\rightarrow$ Refresh Compass $\\rightarrow$ Status updates to 'Cancelled' and seats increase.", options: { color: TEXT_SUB, fontSize: 12 } }
  ];
  s10.addText(compassPoints, { x: 1.1, y: 2.95, w: 5.1, h: 3.5, fontFace: "Arial" });

  // Terminal CLI Method
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 4.9,
    rectRadius: 0.2,
    fill: { color: CARD_BG },
    line: { color: AMBER, width: 1.2 }
  });

  s10.addText("METHOD 2: TERMINAL CLI (npm run db:view)", { x: 7.1, y: 2.0, w: 5.1, h: 0.35, fontFace: "Arial", fontSize: 11, bold: true, color: AMBER, charSpacing: 1.2 });
  s10.addText("Fastest way to show live database tables", { x: 7.1, y: 2.35, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });
  s10.addShape(pptx.ShapeType.line, { x: 7.1, y: 2.75, w: 5.1, h: 0, line: { color: BORDER, width: 1 } });

  const cliPoints = [
    { text: "1. Built-in Terminal Script: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "We engineered 'server-app/view-db.js' to print live records without opening external apps.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "2. Clean Tabular Output: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Run 'npm run db:view' to see formatted ASCII tables of movies and reservations.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "3. Direct Verification: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Instantly confirms ticket ID, customer name, seats booked, and remaining seats right in the console.", options: { color: TEXT_SUB, fontSize: 12 } }
  ];
  s10.addText(cliPoints, { x: 7.1, y: 2.95, w: 5.1, h: 3.5, fontFace: "Arial" });

  // =========================================================================
  // SLIDE 11: Real Engineering Challenges We Solved
  // =========================================================================
  const s11 = createSlide("Real Challenges We Faced & How We Solved Them", "10. PROBLEM SOLVING");

  const challenges = [
    {
      num: "01",
      title: "Preventing Overbooking",
      challenge: "What if two users try to book the last 2 seats at the same time?",
      solution: "Before saving a booking, the backend checks 'availableSeats >= requested'. If not, it safely blocks the reservation."
    },
    {
      num: "02",
      title: "Syncing Two Collections",
      challenge: "Cancelling a ticket must update both the booking document and the movie's seat count.",
      solution: "The cancellation endpoint uses the booking's 'movieId' to automatically increment available seats back to the movie."
    },
    {
      num: "03",
      title: "React 19 Smooth Performance",
      challenge: "Strict compiler rules flagged warnings on cascading state updates.",
      solution: "Refactored state initializers into functional callbacks, passing Oxlint with 0 errors across all 22 files."
    },
    {
      num: "04",
      title: "Clean Header Navigation",
      challenge: "Fixed glass header initially overlapped with page titles.",
      solution: "Fine-tuned header height and page-header padding to exactly 78px for a snug, balanced layout."
    }
  ];

  challenges.forEach((ch, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.8 + col * 6.0;
    const yPos = 1.7 + row * 2.55;

    s11.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 5.7,
      h: 2.35,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: BORDER, width: 1 }
    });

    s11.addText(`${ch.num}. ${ch.title}`, { x: xPos + 0.3, y: yPos + 0.2, w: 5.1, h: 0.35, fontFace: "Georgia", fontSize: 15, bold: true, color: BRAND });
    s11.addText([
      { text: "Problem: ", options: { bold: true, color: AMBER, fontSize: 11 } },
      { text: `${ch.challenge}\n`, options: { color: TEXT_SUB, fontSize: 11 } },
      { text: "Our Solution: ", options: { bold: true, color: EMERALD, fontSize: 11 } },
      { text: `${ch.solution}`, options: { color: TEXT_MAIN, fontSize: 11 } }
    ], { x: xPos + 0.3, y: yPos + 0.65, w: 5.1, h: 1.5, fontFace: "Arial", lineSpacingMultiple: 1.2 });
  });

  // =========================================================================
  // SLIDE 12: Conclusion & What's Next
  // =========================================================================
  const s12 = createSlide("Conclusion: What We Built & What's Next", "11. CONCLUSION & FUTURE SCOPE");

  // Summary Card
  s12.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.7,
    h: 4.9,
    rectRadius: 0.2,
    fill: { color: CARD_BG },
    line: { color: EMERALD, width: 1.2 }
  });

  s12.addText("PROJECT ACHIEVEMENTS", { x: 1.1, y: 2.0, w: 5.1, h: 0.35, fontFace: "Arial", fontSize: 11, bold: true, color: EMERALD, charSpacing: 1.2 });
  s12.addText("A complete, tested, production-ready MERN project", { x: 1.1, y: 2.35, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });
  s12.addShape(pptx.ShapeType.line, { x: 1.1, y: 2.75, w: 5.1, h: 0, line: { color: BORDER, width: 1 } });

  const summaryBullets = [
    { text: "✔ Full CRUD Implemented: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "All 9 endpoints verified and fully functional.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "✔ Real-Time Inventory Sync: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Seat counts decrement and restore automatically.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "✔ Premium Editorial UI: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Warm sunset orange theme with smooth motion reveals.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "✔ Clean Code Standards: ", options: { bold: true, color: TEXT_MAIN, fontSize: 12.5 } },
    { text: "Zero linter warnings and version controlled on GitHub.", options: { color: TEXT_SUB, fontSize: 12 } }
  ];
  s12.addText(summaryBullets, { x: 1.1, y: 2.95, w: 5.1, h: 3.5, fontFace: "Arial" });

  // Future Scope Card
  s12.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 4.9,
    rectRadius: 0.2,
    fill: { color: CARD_BG },
    line: { color: BRAND, width: 1.2 }
  });

  s12.addText("FUTURE HORIZONS", { x: 7.1, y: 2.0, w: 5.1, h: 0.35, fontFace: "Arial", fontSize: 11, bold: true, color: BRAND, charSpacing: 1.2 });
  s12.addText("Next planned features for commercial scale", { x: 7.1, y: 2.35, w: 5.1, h: 0.3, fontFace: "Arial", fontSize: 11, color: TEXT_SUB });
  s12.addShape(pptx.ShapeType.line, { x: 7.1, y: 2.75, w: 5.1, h: 0, line: { color: BORDER, width: 1 } });

  const futureBullets = [
    { text: "1. 2D Interactive Seat Map: ", options: { bold: true, color: AMBER, fontSize: 12.5 } },
    { text: "Visual seating layout showing occupied/vacant recliners.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "2. Online Payment Gateway: ", options: { bold: true, color: AMBER, fontSize: 12.5 } },
    { text: "Razorpay / Stripe integration for UPI and card checkout.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "3. Automated QR Email Passes: ", options: { bold: true, color: AMBER, fontSize: 12.5 } },
    { text: "Digital PDF tickets delivered directly to the user's inbox.\n\n", options: { color: TEXT_SUB, fontSize: 12 } },
    { text: "4. Multi-Theatre Expansion: ", options: { bold: true, color: AMBER, fontSize: 12.5 } },
    { text: "Support for multi-screen multiplexes (IMAX, Screen 1).", options: { color: TEXT_SUB, fontSize: 12 } }
  ];
  s12.addText(futureBullets, { x: 7.1, y: 2.95, w: 5.1, h: 3.5, fontFace: "Arial" });

  const outputPath = path.join(__dirname, "CineBook_Project_Presentation.pptx");
  await pptx.writeFile({ fileName: outputPath });
  console.log("Successfully generated humanized presentation:", outputPath);
}

createHumanizedPresentation().catch(console.error);
