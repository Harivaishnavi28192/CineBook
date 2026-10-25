const path = require("path");
const PptxGenJS = require(path.join(__dirname, "server-app", "node_modules", "pptxgenjs"));

async function createPresentation() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Christy Vincelet A & Hari Vaishnavi";
  pptx.company = "Department of Computer Science & Engineering";
  pptx.title = "CineBook — Movie Ticket Booking System";
  pptx.subject = "Full-Stack Web Development Project Presentation";

  // Color Palette Constants (Exact Website Theme)
  const BG_COLOR = "090B0E";         // Deep Obsidian Slate
  const SURFACE_1 = "12161D";        // Card surface 1
  const SURFACE_2 = "181E26";        // Card surface 2
  const BRAND = "FF6B2B";            // Radiant Sunset Orange
  const BRAND_DARK = "EA580C";       // Burnt Terracotta
  const AMBER = "F59E0B";            // Golden Amber
  const TEXT_WHITE = "F1F5F9";       // Primary text
  const TEXT_MUTED = "94A3B8";       // Secondary text
  const BORDER_COLOR = "2B3542";     // Card border line

  // Helper for consistent slide styling
  function addBaseSlide(title, category = "CINEBOOK — MOVIE TICKET BOOKING SYSTEM") {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };

    // Header category pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 0.45,
      w: 4.5,
      h: 0.32,
      rectRadius: 0.16,
      fill: { color: SURFACE_2 },
      line: { color: BRAND, width: 1 }
    });

    slide.addText(category.toUpperCase(), {
      x: 0.9,
      y: 0.47,
      w: 4.3,
      h: 0.28,
      fontFace: "Arial",
      fontSize: 9,
      bold: true,
      color: BRAND,
      charSpacing: 2
    });

    // Slide Title
    slide.addText(title, {
      x: 0.8,
      y: 0.85,
      w: 11.5,
      h: 0.7,
      fontFace: "Georgia",
      fontSize: 26,
      bold: true,
      color: TEXT_WHITE
    });

    // Bottom Decorative Bar
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8,
      y: 7.0,
      w: 11.7,
      h: 0,
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide.addText("URK24CS1199 · Christy Vincelet A   |   URK24CS1238 · Hari Vaishnavi", {
      x: 0.8,
      y: 7.05,
      w: 8.0,
      h: 0.3,
      fontFace: "Arial",
      fontSize: 10,
      color: TEXT_MUTED
    });

    slide.addText("React JS · Node.js · Express · MongoDB", {
      x: 8.5,
      y: 7.05,
      w: 4.0,
      h: 0.3,
      align: "right",
      fontFace: "Arial",
      fontSize: 10,
      color: BRAND
    });

    return slide;
  }

  // =========================================================================
  // SLIDE 1: Title Slide
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_COLOR };

  // Ambient Glow Accent Card
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 0.9,
    w: 11.7,
    h: 5.7,
    rectRadius: 0.3,
    fill: { color: SURFACE_1 },
    line: { color: BORDER_COLOR, width: 1.5 }
  });

  // Category Pill
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 1.3,
    y: 1.4,
    w: 3.8,
    h: 0.36,
    rectRadius: 0.18,
    fill: { color: SURFACE_2 },
    line: { color: BRAND, width: 1.2 }
  });

  slide1.addText("★ FULL-STACK WEB PROJECT", {
    x: 1.4,
    y: 1.44,
    w: 3.6,
    h: 0.28,
    fontFace: "Arial",
    fontSize: 10,
    bold: true,
    color: BRAND,
    charSpacing: 2
  });

  // Big Main Title
  slide1.addText([
    { text: "Cine", options: { color: TEXT_WHITE, bold: true } },
    { text: "Book", options: { color: BRAND, bold: true, italic: true } }
  ], {
    x: 1.3,
    y: 1.9,
    w: 10.0,
    h: 1.1,
    fontFace: "Georgia",
    fontSize: 54
  });

  slide1.addText("Modern Movie Ticket Booking & Inventory Management System", {
    x: 1.3,
    y: 3.1,
    w: 10.5,
    h: 0.5,
    fontFace: "Arial",
    fontSize: 18,
    color: AMBER,
    bold: true
  });

  slide1.addText("Engineered with React 19 (Vite), Node.js, Express.js REST APIs, and MongoDB Database Persistence with Reactive Motion & Real-Time Seat Synchronization.", {
    x: 1.3,
    y: 3.65,
    w: 10.5,
    h: 0.7,
    fontFace: "Arial",
    fontSize: 13,
    color: TEXT_MUTED
  });

  // Presenters Box
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 1.3,
    y: 4.6,
    w: 5.2,
    h: 1.5,
    rectRadius: 0.2,
    fill: { color: SURFACE_2 },
    line: { color: BORDER_COLOR, width: 1 }
  });

  slide1.addText("DEVELOPED & PRESENTED BY", {
    x: 1.5,
    y: 4.75,
    w: 4.8,
    h: 0.25,
    fontFace: "Arial",
    fontSize: 9,
    bold: true,
    color: BRAND,
    charSpacing: 1.5
  });

  slide1.addText([
    { text: "Christy Vincelet A", options: { bold: true, color: TEXT_WHITE } },
    { text: "   (Reg: URK24CS1199)\n", options: { color: TEXT_MUTED } },
    { text: "Hari Vaishnavi", options: { bold: true, color: TEXT_WHITE } },
    { text: "   (Reg: URK24CS1238)", options: { color: TEXT_MUTED } }
  ], {
    x: 1.5,
    y: 5.05,
    w: 4.8,
    h: 0.85,
    fontFace: "Arial",
    fontSize: 13
  });

  // Tech Badge Box
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 4.6,
    w: 5.2,
    h: 1.5,
    rectRadius: 0.2,
    fill: { color: SURFACE_2 },
    line: { color: BORDER_COLOR, width: 1 }
  });

  slide1.addText("TECHNOLOGY ARCHITECTURE", {
    x: 7.0,
    y: 4.75,
    w: 4.8,
    h: 0.25,
    fontFace: "Arial",
    fontSize: 9,
    bold: true,
    color: BRAND,
    charSpacing: 1.5
  });

  slide1.addText([
    { text: "Frontend: ", options: { bold: true, color: AMBER } },
    { text: "React 19 + Vite + Bootstrap 5\n", options: { color: TEXT_WHITE } },
    { text: "Backend: ", options: { bold: true, color: AMBER } },
    { text: "Node.js + Express.js REST APIs\n", options: { color: TEXT_WHITE } },
    { text: "Database: ", options: { bold: true, color: AMBER } },
    { text: "MongoDB Community Server 9.0", options: { color: TEXT_WHITE } }
  ], {
    x: 7.0,
    y: 5.05,
    w: 4.8,
    h: 0.95,
    fontFace: "Arial",
    fontSize: 11
  });

  // =========================================================================
  // SLIDE 2: Project Overview & Objectives
  // =========================================================================
  const slide2 = addBaseSlide("Project Overview & Problem Statement", "01. OVERVIEW & MOTIVATION");

  // Problem Card (Left)
  slide2.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BORDER_COLOR, width: 1.2 }
  });

  slide2.addText("CHALLENGES IN TRADITIONAL SYSTEMS", {
    x: 1.1,
    y: 1.95,
    w: 5.0,
    h: 0.3,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: BRAND_DARK,
    charSpacing: 1.5
  });

  slide2.addText([
    { text: "• Clunky User Interfaces:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Outdated aesthetics with poor contrast, no responsive feedback, and rigid layouts that frustrate users.\n\n", options: { color: TEXT_MUTED } },
    { text: "• Manual Inventory Discrepancies:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Failing to instantly update seat capacity causes double-booking or displaying sold-out shows as available.\n\n", options: { color: TEXT_MUTED } },
    { text: "• Complicated Cancellation Workflows:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Most platforms lack direct, zero-friction cancellation with immediate seat return back into box office stock.\n\n", options: { color: TEXT_MUTED } },
    { text: "• Fragmented Administration:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Cinema managers lack clean portals to create, edit, or purge movie schedules in real time.", options: { color: TEXT_MUTED } }
  ], {
    x: 1.1,
    y: 2.35,
    w: 5.0,
    h: 4.1,
    fontFace: "Arial",
    fontSize: 11.5
  });

  // Solution Card (Right)
  slide2.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BRAND, width: 1.2 }
  });

  slide2.addText("THE CINEBOOK SOLUTION & OBJECTIVES", {
    x: 7.1,
    y: 1.95,
    w: 5.1,
    h: 0.3,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: BRAND,
    charSpacing: 1.5
  });

  slide2.addText([
    { text: "1. Full CRUD Capabilities:\n", options: { bold: true, color: AMBER } },
    { text: "Comprehensive Create, Read, Update, Delete across both Movies and Customer Reservations.\n\n", options: { color: TEXT_MUTED } },
    { text: "2. Real-Time Seat Synchronization:\n", options: { bold: true, color: AMBER } },
    { text: "Booking decrements available seats atomically; cancelling immediately restores capacity.\n\n", options: { color: TEXT_MUTED } },
    { text: "3. HealthTwin-Inspired Warm Editorial Design:\n", options: { bold: true, color: AMBER } },
    { text: "Editorial Fraunces typography, sunset orange gradients, floating glass header, and full-screen numbered menus.\n\n", options: { color: TEXT_MUTED } },
    { text: "4. Verified Admission Passes:\n", options: { bold: true, color: AMBER } },
    { text: "Generates digital ticket cards with authentic cutouts, showtimes, barcodes, and guest credentials.", options: { color: TEXT_MUTED } }
  ], {
    x: 7.1,
    y: 2.35,
    w: 5.1,
    h: 4.1,
    fontFace: "Arial",
    fontSize: 11.5
  });

  // =========================================================================
  // SLIDE 3: System Architecture (3-Tier Layout)
  // =========================================================================
  const slide3 = addBaseSlide("System Architecture & Tier Structure", "02. ARCHITECTURE DESIGN");

  const tierCols = [
    {
      num: "01",
      name: "PRESENTATION TIER",
      tech: "Client-Side SPA (React 19)",
      items: [
        "React 19 Functional Components & Hooks",
        "Vite Bundler for sub-second HMR",
        "Axios HTTP Client for API integration",
        "React Router Dom v7 for SPA routing",
        "Custom Design System (Warm Sunset Theme)",
        "IntersectionObserver Motion Architecture"
      ]
    },
    {
      num: "02",
      name: "APPLICATION TIER",
      tech: "Server REST API (Node + Express)",
      items: [
        "Express.js 5 Application Server (Port 7000)",
        "RESTful API Route Endpoints",
        "CORS Security & JSON Middleware",
        "Business Logic & Input Validation",
        "Concurrency & Seat Count Restitution",
        "Error handling & Uniform JSON payloads"
      ]
    },
    {
      num: "03",
      name: "DATA PERSISTENCE TIER",
      tech: "Database (MongoDB + Mongoose)",
      items: [
        "MongoDB 9.0 Community Daemon (Port 27017)",
        "Mongoose 9 Object Data Modeling (ODM)",
        "Database name: 'moviebooking'",
        "Indexed Collection: 'movies'",
        "Transactional Collection: 'bookings'",
        "Live inspection via MongoDB Compass"
      ]
    }
  ];

  tierCols.forEach((tier, i) => {
    const xPos = 0.8 + i * 4.0;
    slide3.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 3.7,
      h: 5.0,
      rectRadius: 0.25,
      fill: { color: SURFACE_1 },
      line: { color: i === 1 ? BRAND : BORDER_COLOR, width: 1.2 }
    });

    slide3.addShape(pptx.ShapeType.roundRect, {
      x: xPos + 0.3,
      y: 1.95,
      w: 0.6,
      h: 0.45,
      rectRadius: 0.12,
      fill: { color: BRAND },
      line: { color: BRAND, width: 1 }
    });

    slide3.addText(tier.num, {
      x: xPos + 0.3,
      y: 1.95,
      w: 0.6,
      h: 0.45,
      align: "center",
      fontFace: "Georgia",
      fontSize: 14,
      bold: true,
      color: BG_COLOR
    });

    slide3.addText(tier.name, {
      x: xPos + 1.05,
      y: 1.95,
      w: 2.4,
      h: 0.45,
      fontFace: "Arial",
      fontSize: 10,
      bold: true,
      color: BRAND,
      charSpacing: 1.2
    });

    slide3.addText(tier.tech, {
      x: xPos + 0.3,
      y: 2.55,
      w: 3.1,
      h: 0.4,
      fontFace: "Arial",
      fontSize: 12,
      bold: true,
      color: AMBER
    });

    slide3.addShape(pptx.ShapeType.line, {
      x: xPos + 0.3,
      y: 3.0,
      w: 3.1,
      h: 0,
      line: { color: BORDER_COLOR, width: 1 }
    });

    const bulletList = tier.items.map((it) => ({ text: `• ${it}\n\n`, options: { color: TEXT_MUTED } }));
    slide3.addText(bulletList, {
      x: xPos + 0.3,
      y: 3.15,
      w: 3.1,
      h: 3.3,
      fontFace: "Arial",
      fontSize: 10.5
    });
  });

  // =========================================================================
  // SLIDE 4: Technology Stack & Specifications
  // =========================================================================
  const slide4 = addBaseSlide("Technology Stack & Development Tools", "03. TECHNICAL SPECIFICATIONS");

  const techCards = [
    {
      category: "FRONTEND STACK",
      accent: BRAND,
      details: [
        ["Framework & Bundler", "React 19.3 + Vite 8.3 (ESM Modules)"],
        ["Styling Framework", "Bootstrap 5.3 + Custom CSS3 Design Tokens"],
        ["Iconography", "Tabler Icons Webfont + Bootstrap Icons"],
        ["Client Routing", "React Router DOM v7 (Declarative Navigation)"],
        ["HTTP Client", "Axios v1.20 (Promise-based Async/Await)"]
      ]
    },
    {
      category: "BACKEND STACK",
      accent: AMBER,
      details: [
        ["Runtime Engine", "Node.js (LTS Engine)"],
        ["Web Framework", "Express.js 5.3 (Fast, Unopinionated REST API)"],
        ["Database Driver", "Mongoose 9.11 ODM (Strict Schemas & Models)"],
        ["Cross-Origin Sharing", "cors 2.8.6 Middleware for Port Decoupling"],
        ["Development Runner", "nodemon 3.1 for Real-Time Live Reloading"]
      ]
    },
    {
      category: "DATABASE & DEVOPS",
      accent: BRAND_DARK,
      details: [
        ["Database Engine", "MongoDB 9.0 Community Server (Local Daemon)"],
        ["Database GUI", "MongoDB Compass Desktop Client (Visual Admin)"],
        ["Version Control", "Git 2.47 + GitHub Remote Repository"],
        ["Code Quality & Linter", "oxlint v1.88 (Sub-50ms Multi-Threaded Linter)"],
        ["Custom CLI Tool", "npm run db:view (Direct Terminal Table Output)"]
      ]
    }
  ];

  techCards.forEach((card, i) => {
    const xPos = 0.8 + i * 4.0;
    slide4.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.7,
      w: 3.7,
      h: 5.0,
      rectRadius: 0.25,
      fill: { color: SURFACE_1 },
      line: { color: BORDER_COLOR, width: 1.2 }
    });

    slide4.addText(card.category, {
      x: xPos + 0.3,
      y: 1.95,
      w: 3.1,
      h: 0.35,
      fontFace: "Arial",
      fontSize: 11,
      bold: true,
      color: card.accent,
      charSpacing: 1.5
    });

    slide4.addShape(pptx.ShapeType.line, {
      x: xPos + 0.3,
      y: 2.35,
      w: 3.1,
      h: 0,
      line: { color: BORDER_COLOR, width: 1 }
    });

    const textArr = [];
    card.details.forEach(([label, val]) => {
      textArr.push({ text: `${label}:\n`, options: { bold: true, color: TEXT_WHITE, fontSize: 10 } });
      textArr.push({ text: `${val}\n\n`, options: { color: TEXT_MUTED, fontSize: 10 } });
    });

    slide4.addText(textArr, {
      x: xPos + 0.3,
      y: 2.55,
      w: 3.1,
      h: 4.0,
      fontFace: "Arial"
    });
  });

  // =========================================================================
  // SLIDE 5: Data Modeling & MongoDB Schemas
  // =========================================================================
  const slide5 = addBaseSlide("Database Modeling & Schema Architecture", "04. DATABASE DESIGN");

  // Schema 1: Movies
  slide5.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BRAND, width: 1.2 }
  });

  slide5.addText("COLLECTION: 'movies'  (Movie Schema)", {
    x: 1.1,
    y: 1.95,
    w: 5.0,
    h: 0.35,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: BRAND,
    charSpacing: 1.2
  });

  const movieFields = [
    ["movieId", "String", "Unique movie code (e.g., M101, M102)", "unique: true"],
    ["title", "String", "Film title (e.g., Leo, Inception, Jawan)", "required: true"],
    ["genre", "String", "Categorization (Action, Sci-Fi, Drama)", "required: true"],
    ["duration", "Number", "Runtime duration measured in minutes", "required: true"],
    ["language", "String", "Audio language (Tamil, English, Hindi)", "required: true"],
    ["availableSeats", "Number", "Current seats left in theatre", "min: 0, required"]
  ];

  const movieRows = [
    [
      { text: "Field", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "Type", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "Description", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "Constraints", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } }
    ]
  ];

  movieFields.forEach(([f, t, d, c]) => {
    movieRows.push([
      { text: f, options: { bold: true, color: TEXT_WHITE, fontFace: "Courier New" } },
      { text: t, options: { color: AMBER } },
      { text: d, options: { color: TEXT_MUTED } },
      { text: c, options: { color: BRAND_DARK, fontSize: 8.5 } }
    ]);
  });

  slide5.addTable(movieRows, {
    x: 1.0,
    y: 2.45,
    w: 5.2,
    colW: [1.2, 0.8, 2.0, 1.2],
    fontSize: 9.5,
    fontFace: "Arial",
    border: { color: BORDER_COLOR, pt: 1 }
  });

  // Schema 2: Bookings
  slide5.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: AMBER, width: 1.2 }
  });

  slide5.addText("COLLECTION: 'bookings'  (Booking Schema)", {
    x: 7.1,
    y: 1.95,
    w: 5.1,
    h: 0.35,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: AMBER,
    charSpacing: 1.2
  });

  const bookingFields = [
    ["customerName", "String", "Guest / Passenger full name", "required: true"],
    ["movieId", "String", "Referenced movie identifier", "required: true"],
    ["movieTitle", "String", "Snapshot of movie title at booking", "required: true"],
    ["showtime", "String", "Screening slot (e.g. 10:00 AM, 6:00 PM)", "required: true"],
    ["seats", "Number", "Quantity of reserved recliner seats", "min: 1, required"],
    ["status", "String", "'Booked' or 'Cancelled'", "default: 'Booked'"],
    ["bookingDate", "Date", "ISO timestamp of transaction", "default: Date.now"]
  ];

  const bookingRows = [
    [
      { text: "Field", options: { bold: true, color: AMBER, fill: { color: SURFACE_2 } } },
      { text: "Type", options: { bold: true, color: AMBER, fill: { color: SURFACE_2 } } },
      { text: "Description", options: { bold: true, color: AMBER, fill: { color: SURFACE_2 } } },
      { text: "Constraints", options: { bold: true, color: AMBER, fill: { color: SURFACE_2 } } }
    ]
  ];

  bookingFields.forEach(([f, t, d, c]) => {
    bookingRows.push([
      { text: f, options: { bold: true, color: TEXT_WHITE, fontFace: "Courier New" } },
      { text: t, options: { color: BRAND } },
      { text: d, options: { color: TEXT_MUTED } },
      { text: c, options: { color: BRAND_DARK, fontSize: 8.5 } }
    ]);
  });

  slide5.addTable(bookingRows, {
    x: 7.0,
    y: 2.45,
    w: 5.3,
    colW: [1.3, 0.7, 2.1, 1.2],
    fontSize: 9.5,
    fontFace: "Arial",
    border: { color: BORDER_COLOR, pt: 1 }
  });

  // =========================================================================
  // SLIDE 6: Backend RESTful API Matrix
  // =========================================================================
  const slide6 = addBaseSlide("RESTful API Architecture & Endpoints", "05. BACKEND SPECIFICATIONS");

  slide6.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 11.7,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BORDER_COLOR, width: 1.2 }
  });

  const apiTableRows = [
    [
      { text: "HTTP Method", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "API Endpoint URL", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "CRUD Type", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "Payload / Query Params", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } },
      { text: "Business Purpose & Behavior", options: { bold: true, color: BRAND, fill: { color: SURFACE_2 } } }
    ],
    [
      { text: "POST", options: { bold: true, color: "10B981" } },
      { text: "/api/addMovie", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "CREATE", options: { color: AMBER, bold: true } },
      { text: "{ movieId, title, genre, duration, ... }", options: { color: TEXT_MUTED, fontSize: 8.5 } },
      { text: "Creates a new movie in the 'movies' collection with seat limit", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "GET", options: { bold: true, color: "3B82F6" } },
      { text: "/api/viewMovies", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "READ", options: { color: AMBER, bold: true } },
      { text: "None", options: { color: TEXT_MUTED } },
      { text: "Retrieves all currently scheduled movies and their remaining seats", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "GET", options: { bold: true, color: "3B82F6" } },
      { text: "/api/searchMovies", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "READ", options: { color: AMBER, bold: true } },
      { text: "?title=searchQuery", options: { color: TEXT_MUTED } },
      { text: "Case-insensitive regex search query filtering movie titles", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "POST", options: { bold: true, color: "F59E0B" } },
      { text: "/api/updateMovie", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "UPDATE", options: { color: AMBER, bold: true } },
      { text: "{ id, title, genre, duration, seats }", options: { color: TEXT_MUTED, fontSize: 8.5 } },
      { text: "Modifies movie metadata and updates maximum seat quota", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "POST", options: { bold: true, color: "EF4444" } },
      { text: "/api/deleteMovie", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "DELETE", options: { color: AMBER, bold: true } },
      { text: "{ id }", options: { color: TEXT_MUTED } },
      { text: "Deletes movie and cascades cancellation to all related bookings", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "POST", options: { bold: true, color: "10B981" } },
      { text: "/api/bookTicket", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "CREATE", options: { color: AMBER, bold: true } },
      { text: "{ customerName, movieId, showtime, seats }", options: { color: TEXT_MUTED, fontSize: 8.5 } },
      { text: "Validates capacity, decrements movie seats, and generates ticket pass", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "GET", options: { bold: true, color: "3B82F6" } },
      { text: "/api/viewBookings", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "READ", options: { color: AMBER, bold: true } },
      { text: "None", options: { color: TEXT_MUTED } },
      { text: "Fetches complete reservation history sorted by newest booking first", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "POST", options: { bold: true, color: "F59E0B" } },
      { text: "/api/cancelBooking", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "UPDATE", options: { color: AMBER, bold: true } },
      { text: "{ id }", options: { color: TEXT_MUTED } },
      { text: "Sets status to 'Cancelled' and restores ticket seats back to movie capacity", options: { color: TEXT_MUTED } }
    ],
    [
      { text: "POST", options: { bold: true, color: "EF4444" } },
      { text: "/api/deleteBooking", options: { fontFace: "Courier New", color: TEXT_WHITE } },
      { text: "DELETE", options: { color: AMBER, bold: true } },
      { text: "{ id }", options: { color: TEXT_MUTED } },
      { text: "Permanently removes booking document from the database collection", options: { color: TEXT_MUTED } }
    ]
  ];

  slide6.addTable(apiTableRows, {
    x: 1.0,
    y: 1.9,
    w: 11.3,
    colW: [1.3, 2.0, 1.2, 3.2, 3.6],
    fontSize: 9.5,
    fontFace: "Arial",
    border: { color: BORDER_COLOR, pt: 1 }
  });

  // =========================================================================
  // SLIDE 7: Core Workflow 1 — Ticket Booking Flow
  // =========================================================================
  const slide7 = addBaseSlide("Technical Workflow: Ticket Booking & Inventory Sync", "06. WORKFLOW ARCHITECTURE");

  const bookingSteps = [
    {
      step: "STEP 1: SELECTION",
      title: "Client Chooses Show",
      desc: "User selects Movie, Showtime (10 AM / 1:30 PM / 6 PM / 9:30 PM), enters Customer Name and Seat Count on the React SPA."
    },
    {
      step: "STEP 2: DISPATCH",
      title: "Axios API Request",
      desc: "Frontend sends async POST payload to Express: { customerName, movieId, showtime, seats } via Axios."
    },
    {
      step: "STEP 3: VALIDATION",
      title: "Server Inventory Check",
      desc: "Express queries MongoDB: verifies movie exists and availableSeats >= requestedSeats to prevent overbooking."
    },
    {
      step: "STEP 4: ATOMIC UPDATE",
      title: "Seat Decrement & Save",
      desc: "Backend decrements movie.availableSeats, saves new Booking document into MongoDB 'bookings' collection."
    },
    {
      step: "STEP 5: CONFIRMATION",
      title: "Pass Issuance",
      desc: "Server returns confirmed status; React transitions to digital ticket view with barcode reference and triggers auto-reload."
    }
  ];

  bookingSteps.forEach((st, i) => {
    const xPos = 0.8 + i * 2.38;
    slide7.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.8,
      w: 2.2,
      h: 4.8,
      rectRadius: 0.2,
      fill: { color: SURFACE_1 },
      line: { color: i === 2 || i === 3 ? BRAND : BORDER_COLOR, width: 1.2 }
    });

    slide7.addText(st.step, {
      x: xPos + 0.15,
      y: 2.05,
      w: 1.9,
      h: 0.3,
      fontFace: "Arial",
      fontSize: 8.5,
      bold: true,
      color: BRAND,
      charSpacing: 1
    });

    slide7.addText(st.title, {
      x: xPos + 0.15,
      y: 2.45,
      w: 1.9,
      h: 0.6,
      fontFace: "Georgia",
      fontSize: 13,
      bold: true,
      color: TEXT_WHITE
    });

    slide7.addShape(pptx.ShapeType.line, {
      x: xPos + 0.15,
      y: 3.15,
      w: 1.9,
      h: 0,
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide7.addText(st.desc, {
      x: xPos + 0.15,
      y: 3.3,
      w: 1.9,
      h: 3.0,
      fontFace: "Arial",
      fontSize: 10,
      color: TEXT_MUTED
    });
  });

  // =========================================================================
  // SLIDE 8: Core Workflow 2 — Ticket Cancellation Flow
  // =========================================================================
  const slide8 = addBaseSlide("Technical Workflow: Ticket Cancellation & Restitution", "07. WORKFLOW ARCHITECTURE");

  const cancelSteps = [
    {
      step: "STAGE 1",
      title: "User Cancellation Intent",
      desc: "User clicks 'Cancel' on active booking in the My Bookings view (/bookings). ConfirmModal renders an alert dialog."
    },
    {
      step: "STAGE 2",
      title: "Modal Safeguard",
      desc: "User confirms action in modal; frontend dispatches POST /api/cancelBooking with the target booking ID { id }."
    },
    {
      step: "STAGE 3",
      title: "Status Transition",
      desc: "Express server queries MongoDB: checks if status === 'Cancelled' already. If active, updates booking.status = 'Cancelled'."
    },
    {
      step: "STAGE 4",
      title: "Seat Restitution",
      desc: "Server retrieves corresponding movie by movieId and automatically adds seats back: availableSeats += booking.seats."
    },
    {
      step: "STAGE 5",
      title: "Real-Time Sync",
      desc: "Server saves changes; client receives success message, reloads booking and movie states, and updates badge indicators."
    }
  ];

  cancelSteps.forEach((st, i) => {
    const xPos = 0.8 + i * 2.38;
    slide8.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.8,
      w: 2.2,
      h: 4.8,
      rectRadius: 0.2,
      fill: { color: SURFACE_1 },
      line: { color: i === 3 ? AMBER : BORDER_COLOR, width: 1.2 }
    });

    slide8.addText(st.step, {
      x: xPos + 0.15,
      y: 2.05,
      w: 1.9,
      h: 0.3,
      fontFace: "Arial",
      fontSize: 8.5,
      bold: true,
      color: AMBER,
      charSpacing: 1
    });

    slide8.addText(st.title, {
      x: xPos + 0.15,
      y: 2.45,
      w: 1.9,
      h: 0.6,
      fontFace: "Georgia",
      fontSize: 13,
      bold: true,
      color: TEXT_WHITE
    });

    slide8.addShape(pptx.ShapeType.line, {
      x: xPos + 0.15,
      y: 3.15,
      w: 1.9,
      h: 0,
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide8.addText(st.desc, {
      x: xPos + 0.15,
      y: 3.3,
      w: 1.9,
      h: 3.0,
      fontFace: "Arial",
      fontSize: 10,
      color: TEXT_MUTED
    });
  });

  // =========================================================================
  // SLIDE 9: UI/UX Innovations & Warm Theme
  // =========================================================================
  const slide9 = addBaseSlide("UI/UX Engineering & Editorial Motion Design", "08. USER EXPERIENCE");

  const uxFeatures = [
    {
      title: "Warm Sunset Color Palette",
      desc: "Replaced harsh cinema red with sophisticated shades of radiant orange (#FF6B2B), burnt terracotta (#EA580C), golden amber (#F59E0B), and obsidian dark slate (#090B0E)."
    },
    {
      title: "Editorial Typography",
      desc: "Integrated Google Fonts Fraunces display serif with optical sizing for headlines and DM Sans for clean readability, enriched with bespoke italic emphasis tags."
    },
    {
      title: "SVG Cinema Pulse Preloader",
      desc: "Animated SVG pulse path loader with glowing orange strokes and CineBook brand mark that smoothly disappears upon application hydration."
    },
    {
      title: "Scroll Reveal Animations",
      desc: "Engineered useScrollReveal React hook utilizing IntersectionObserver to trigger smooth cubic ease-out fade-ups with custom delay variables (--d)."
    },
    {
      title: "Interactive 3D Ticket Parallax",
      desc: "Interactive mouse move event listener creates a dynamic 3D tilt perspective on the featured hero ticket with play badge hover reveals."
    },
    {
      title: "Glassmorphic Header & Fullscreen Menu",
      desc: "Fixed navigation bar with backdrop blur, smart scroll hide/reveal behavior, and full-screen numbered menu overlay (01 to 05) with quick action cards."
    }
  ];

  uxFeatures.forEach((feat, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const xPos = 0.8 + col * 4.0;
    const yPos = 1.8 + row * 2.5;

    slide9.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 3.7,
      h: 2.3,
      rectRadius: 0.2,
      fill: { color: SURFACE_1 },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide9.addText(feat.title, {
      x: xPos + 0.25,
      y: yPos + 0.2,
      w: 3.2,
      h: 0.45,
      fontFace: "Georgia",
      fontSize: 13,
      bold: true,
      color: BRAND
    });

    slide9.addText(feat.desc, {
      x: xPos + 0.25,
      y: yPos + 0.7,
      w: 3.2,
      h: 1.45,
      fontFace: "Arial",
      fontSize: 10,
      color: TEXT_MUTED
    });
  });

  // =========================================================================
  // SLIDE 10: Live Database Verification & Compass
  // =========================================================================
  const slide10 = addBaseSlide("Live Database Verification & Demonstration", "09. VIVA DEMONSTRATION");

  slide10.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BRAND, width: 1.2 }
  });

  slide10.addText("DEMO METHOD 1: MONGODB COMPASS GUI", {
    x: 1.1,
    y: 1.95,
    w: 5.0,
    h: 0.35,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: BRAND,
    charSpacing: 1.2
  });

  slide10.addText([
    { text: "1. Connection Setup:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Open MongoDB Compass -> connect to default URI: mongodb://localhost:27017\n\n", options: { color: TEXT_MUTED } },
    { text: "2. Database Selection:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Navigate to the 'moviebooking' database to view the 'movies' and 'bookings' collections.\n\n", options: { color: TEXT_MUTED } },
    { text: "3. Real-Time Document Inspection:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Documents store JSON fields: movieId, title, availableSeats, customerName, and status.\n\n", options: { color: TEXT_MUTED } },
    { text: "4. Live Action Reflection:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Book or cancel a ticket on the web UI, press Compass Refresh (🔄), and the new record/status update appears immediately.", options: { color: TEXT_MUTED } }
  ], {
    x: 1.1,
    y: 2.35,
    w: 5.0,
    h: 4.1,
    fontFace: "Arial",
    fontSize: 11
  });

  slide10.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: AMBER, width: 1.2 }
  });

  slide10.addText("DEMO METHOD 2: TERMINAL CLI (npm run db:view)", {
    x: 7.1,
    y: 1.95,
    w: 5.1,
    h: 0.35,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: AMBER,
    charSpacing: 1.2
  });

  slide10.addText([
    { text: "1. Dedicated CLI Inspection Utility:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Built server-app/view-db.js connected directly via Mongoose ODM.\n\n", options: { color: TEXT_MUTED } },
    { text: "2. Instant Terminal Tables:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Run 'npm run db:view' inside server-app to render live ASCII formatted tables of movies and reservations.\n\n", options: { color: TEXT_MUTED } },
    { text: "3. Instant Verification for Evaluators:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Displays Ticket ID, Customer, Movie Title, Showtime, Seats, Status, and Date in tabular formatting.\n\n", options: { color: TEXT_MUTED } },
    { text: "4. Zero Third-Party Dependency:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Can be executed anywhere without opening external database browser tools.", options: { color: TEXT_MUTED } }
  ], {
    x: 7.1,
    y: 2.35,
    w: 5.1,
    h: 4.1,
    fontFace: "Arial",
    fontSize: 11
  });

  // =========================================================================
  // SLIDE 11: Key Challenges & Engineering Solutions
  // =========================================================================
  const slide11 = addBaseSlide("Technical Challenges & Engineering Solutions", "10. PROBLEM SOLVING");

  const challenges = [
    {
      num: "01",
      title: "Seat Overbooking & Inventory Contention",
      problem: "Concurrent users attempting to book the last available seats simultaneously.",
      solution: "Implemented pre-save capacity checks on the backend verifying availableSeats >= requestedSeats before persisting bookings and decrementing inventory."
    },
    {
      num: "02",
      title: "Two-Way Collection Synchronization",
      problem: "Cancelling a ticket must update both the booking document and the movie inventory.",
      solution: "Engineered cancellation API logic that updates booking.status to 'Cancelled' and automatically executes availableSeats += booking.seats."
    },
    {
      num: "03",
      title: "React 19 Hydration & Effect Cascades",
      problem: "Strict React Compiler rules trigger warnings when setState is executed synchronously inside effects.",
      solution: "Migrated state initializers to callback patterns, derived values during render, and passed oxlint check with 0 warnings."
    },
    {
      num: "04",
      title: "Fixed Header Navigation Spacing",
      problem: "Fixed glassmorphic header caused overlapping collisions with page title banners.",
      solution: "Calculated exact 76px header height offset and tailored padding-top to 78px with compact container padding for a snug, professional layout."
    }
  ];

  challenges.forEach((ch, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.8 + col * 6.0;
    const yPos = 1.8 + row * 2.5;

    slide11.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 5.7,
      h: 2.3,
      rectRadius: 0.2,
      fill: { color: SURFACE_1 },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide11.addText(`${ch.num}. ${ch.title}`, {
      x: xPos + 0.25,
      y: yPos + 0.2,
      w: 5.2,
      h: 0.35,
      fontFace: "Georgia",
      fontSize: 13,
      bold: true,
      color: BRAND
    });

    slide11.addText([
      { text: "Challenge: ", options: { bold: true, color: AMBER, fontSize: 10 } },
      { text: `${ch.problem}\n`, options: { color: TEXT_MUTED, fontSize: 10 } },
      { text: "Solution: ", options: { bold: true, color: "10B981", fontSize: 10 } },
      { text: `${ch.solution}`, options: { color: TEXT_WHITE, fontSize: 10 } }
    ], {
      x: xPos + 0.25,
      y: yPos + 0.6,
      w: 5.2,
      h: 1.55,
      fontFace: "Arial"
    });
  });

  // =========================================================================
  // SLIDE 12: Conclusion & Future Scope
  // =========================================================================
  const slide12 = addBaseSlide("Project Summary & Future Horizons", "11. CONCLUSION & FUTURE SCOPE");

  slide12.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.7,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BORDER_COLOR, width: 1.2 }
  });

  slide12.addText("PROJECT OUTCOMES & ACHIEVEMENTS", {
    x: 1.1,
    y: 1.95,
    w: 5.0,
    h: 0.35,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: BRAND,
    charSpacing: 1.2
  });

  slide12.addText([
    { text: "✔ Full-Stack MERN Architecture:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Successfully built and deployed a production-grade cinema ticketing solution connecting React, Express, and MongoDB.\n\n", options: { color: TEXT_MUTED } },
    { text: "✔ Complete CRUD Lifecycle:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "All 9 RESTful endpoints verified with atomic inventory synchronization and cascading record cleanup.\n\n", options: { color: TEXT_MUTED } },
    { text: "✔ High-End Editorial Aesthetics:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Engineered warm sunset color palette, Fraunces serif typography, 3D parallax hero card, and smooth reveal animations.\n\n", options: { color: TEXT_MUTED } },
    { text: "✔ Robust Quality Assurance:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "Zero lint errors, strict schema validations, and direct CLI inspection tooling.", options: { color: TEXT_MUTED } }
  ], {
    x: 1.1,
    y: 2.35,
    w: 5.0,
    h: 4.1,
    fontFace: "Arial",
    fontSize: 11
  });

  slide12.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 5.0,
    rectRadius: 0.25,
    fill: { color: SURFACE_1 },
    line: { color: BRAND, width: 1.2 }
  });

  slide12.addText("FUTURE ENHANCEMENTS ROADMAP", {
    x: 7.1,
    y: 1.95,
    w: 5.1,
    h: 0.35,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: BRAND,
    charSpacing: 1.2
  });

  slide12.addText([
    { text: "1. Interactive 2D Seat Matrix:\n", options: { bold: true, color: AMBER } },
    { text: "Visual seating layout enabling users to pick specific recliner row and column positions.\n\n", options: { color: TEXT_MUTED } },
    { text: "2. Payment Gateway Integration:\n", options: { bold: true, color: AMBER } },
    { text: "Securing live checkout via Razorpay / Stripe for automated UPI, card, and net banking processing.\n\n", options: { color: TEXT_MUTED } },
    { text: "3. Automated QR Code & Email Tickets:\n", options: { bold: true, color: AMBER } },
    { text: "Nodemailer integration to email verified PDF admission passes with scannable QR codes.\n\n", options: { color: TEXT_MUTED } },
    { text: "4. Multi-Screen & Theatre Franchise Scaling:\n", options: { bold: true, color: AMBER } },
    { text: "Extending database schema to support multiple cinema venues, screens (Screen 1, IMAX, 4DX), and pricing tiers.", options: { color: TEXT_MUTED } }
  ], {
    x: 7.1,
    y: 2.35,
    w: 5.1,
    h: 4.1,
    fontFace: "Arial",
    fontSize: 11
  });

  const outputPath = path.join(__dirname, "CineBook_Project_Presentation.pptx");
  await pptx.writeFile({ fileName: outputPath });
  console.log("Successfully generated:", outputPath);
}

createPresentation().catch(console.error);
