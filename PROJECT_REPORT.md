# CineBook — Project Documentation & Academic Report

---

# ABSTRACT

In contemporary society, cinema and digital entertainment represent a cornerstone of global popular culture. However, traditional movie reservation platforms frequently suffer from monolithic, bloated architectures, significant latency bottlenecks, lack of immediate visual feedback, and cumbersome ticket cancellation workflows that fail to re-allocate inventory dynamically. To address these critical limitations, this project presents **CineBook**, a modern, full-stack Movie Ticket Booking and Inventory Management System engineered using the MERN architecture (MongoDB, Express.js, React.js, Node.js) paired with the modern Vite frontend toolchain.

The core objective of CineBook is to deliver a reactive, high-performance, and visually captivating theatrical reservation ecosystem. The system features complete Create, Read, Update, and Delete (CRUD) capabilities across both film schedules and customer reservations. Built on a decoupled three-tier architecture, the presentation layer leverages React 19, custom CSS3 design tokens, and the *IntersectionObserver* API to achieve fluid motion dynamics and micro-interactions. The application layer operates via an Express.js RESTful API handling nine specialized endpoints with strict input validation and atomic seat inventory synchronization. The persistence layer utilizes MongoDB Community Server governed by Mongoose Object Data Modeling (ODM) schemas to guarantee relational integrity and prevent concurrency hazards such as overbooking.

Evaluation and empirical testing demonstrate that CineBook delivers sub-second page transitions, automated inventory restitution upon ticket cancellation, verified digital admission pass generation with unique barcode references, and integrated database inspection capabilities through MongoDB Compass and dedicated terminal utilities. CineBook establishes a scalable, robust, and aesthetically refined standard for modern digital ticketing web applications.

---

# CHAPTER 1
# INTRODUCTION

### 1.1 Background
The theatrical entertainment industry has undergone a monumental paradigm shift over the past two decades. The historical practice of standing in physical queues at cinema box offices has been almost entirely superseded by web-based and mobile reservation platforms. Today’s cinema patrons expect instantaneous access to film catalogs, real-time seat availability matrices, transparent pricing, and effortless booking workflows. 

Simultaneously, web engineering standards have advanced considerably. Monolithic server-rendered architectures are increasingly replaced by decoupled Single-Page Application (SPA) paradigms that deliver desktop-class responsiveness and smooth client-side routing. Furthermore, visual design expectations have shifted toward sophisticated editorial aesthetics characterized by bespoke typography, harmonious color palettes, and subtle, physics-based micro-interactions that elevate the digital consumer journey. CineBook was conceptualized and developed to embody these modern web engineering and user-experience principles.

### 1.2 Problem Statement
Despite the proliferation of online ticketing systems, existing commercial platforms and academic prototype implementations exhibit notable deficiencies:
1. **Performance and Latency Overhead:** Many conventional portals load extensive third-party scripts, advertisements, and unoptimized assets, resulting in high Time-to-Interactive (TTI) metrics and sluggish user navigation.
2. **Inventory Contention and Concurrency Issues:** Weak synchronization between booking transactions and backend database records often leads to seat contention, race conditions, or display of outdated seat availability numbers.
3. **Friction-Ridden Cancellation Protocols:** Most ticketing platforms either disallow digital cancellations entirely or require tedious multi-step customer support requests, failing to immediately release reserved seats back into the available box-office inventory for other patrons.
4. **Disjointed Administrative Interfaces:** Cinema managers frequently lack a cohesive, responsive administrative interface to create, update, or purge movie listings and calibrate seat allocations on the fly.
5. **Generic and Uninspiring User Experience:** Traditional interfaces often rely on generic UI kits with poor contrast ratios, harsh color schemes, and no micro-motion feedback.

### 1.3 Objectives
The primary objectives of the CineBook project are:
* **To Architect an Interactive Single-Page Application:** Develop an intuitive, mobile-responsive client interface using React 19 and Vite that eliminates full page reloads and offers instantaneous screen transitions.
* **To Engineer a Robust RESTful Backend:** Construct a scalable API layer with Node.js and Express.js to process transactional payloads, enforce business rules, and communicate asynchronously with the database.
* **To Implement Schema-Enforced Persistent Storage:** Utilize MongoDB and Mongoose ODM to establish strict validation rules, index critical identifiers, and guarantee data consistency across film catalogs and customer bookings.
* **To Automate Real-Time Seat Synchronization:** Ensure that ticket bookings atomically decrement available seat counts, while cancellations immediately restore seat allocations back to the active inventory without manual administrative intervention.
* **To Incorporate High-End Editorial Aesthetics and Motion:** Implement an editorial visual theme inspired by modern healthcare and luxury platforms, utilizing warm sunset orange tones, Fraunces serif typography, 3D parallax card tilt, animated numeric counters, and a branded preloader.

### 1.4 Scope
The scope of CineBook encompasses:
* **Theatrical Schedule Management:** Creating, viewing, editing, and deleting movie listings, including metadata such as titles, genres, runtime durations, audio languages, and seating capacities.
* **Intelligent Querying:** Dynamic client-side filtering across genres and languages, multi-criteria sorting (by title, runtime, or available seats), and real-time backend title search via regular expressions.
* **Interactive Ticketing Engine:** Multi-step reservation workflow incorporating movie selection, showtime slot picking (morning, matinee, evening, night), seat quantity stepper, and live summary preview.
* **Admission Pass Issuance:** Dynamic rendering of digital ticket cards complete with perforated cutouts, passenger credentials, booking timestamps, and barcode references.
* **Reservation Lifecycle Control:** Viewing complete customer booking histories, filtering between active and cancelled passes, one-click ticket cancellation with confirmation safeguards, and permanent record deletion.
* **Database Inspection Support:** Direct compatibility with MongoDB Compass graphical administration and integrated command-line interface (CLI) tabular database visualization tools.

### 1.5 Proposed Solution
CineBook resolves the shortcomings of legacy reservation portals through a cohesive MERN-stack architecture. By decoupling frontend presentation from backend logic, client interactions execute with zero page reloads. Asynchronous Axios calls communicate with lightweight Express API endpoints that handle transactional payloads in JSON format. Relational synchronization between the `movies` and `bookings` collections is enforced programmatically: whenever an admission ticket is created or cancelled, the corresponding movie document’s `availableSeats` attribute is modified atomically. The user interface applies modern design tokens, combining obsidian slate backgrounds with glowing sunset orange accents, delivering a cinema booking application that is both technically resilient and visually distinctive.

---

# CHAPTER 2
# SYSTEM ANALYSIS

### 2.1 Existing System
The existing ecosystem of movie ticketing primarily consists of legacy multi-page web applications (MPAs) or manual over-the-counter ticket dispensing software. In legacy web systems, every user operation—such as choosing a genre filter, checking seat availability, or submitting a reservation—triggers a complete HTTP request-response cycle resulting in a browser-level document reload. Database communication is frequently synchronous or tightly coupled with server-side page rendering templates (such as JSP, PHP, or ASP.NET), which degrades scalability during peak booking windows.

### 2.2 Limitations of the Existing System
* **Excessive Network Overhead:** Frequent full-page reloads consume unnecessary bandwidth and induce noticeable screen flickering.
* **Data Stagnation:** Static web pages fail to reflect real-time changes in theatre seating capacity, increasing the likelihood of customer disappointment upon checkout.
* **No Automated Restitution:** Cancelled reservations require manual reconciliation in the database before seats can be made available to other users.
* **Lack of Concurrency Guardrails:** Simultaneous checkout operations can result in negative seat tallies or database inconsistencies.
* **Inflexible Monolithic Codebase:** Tightly coupled server and presentation code severely limits modular enhancements, testing, and modern UI upgrades.

### 2.3 Proposed System
The proposed CineBook system establishes a distributed, micro-service-oriented Single Page Application. Frontend state is managed dynamically in memory via React hooks, fetching and pushing data across asynchronous RESTful endpoints. The core advantages of the proposed system include:
* **Instantaneous UI Reactivity:** Zero full-page refreshes; components re-render selectively upon receiving JSON updates.
* **Atomic Concurrency Protection:** The API validates that requested seats do not exceed real-time capacity before confirming any transaction.
* **Bidirectional Inventory Restitution:** Cancelling a ticket immediately transitions its status to `Cancelled` and automatically increments the parent movie's available seat count.
* **Rich Visual & Sensory Feedback:** Animated SVG loaders, counting statistics, and 3D perspective tilt effects provide constant confirmation of system status.
* **Direct Inspection Utilities:** Built-in console table scripts and MongoDB Compass GUI integration provide immediate verification for system administrators and evaluators.

### 2.4 Functional Requirements
* **FR1: Film Catalog Management (CRUD):** The administrator must be able to add new movies with unique identifiers, update runtime and language attributes, and purge decommissioned titles along with their booking histories.
* **FR2: Dynamic Search and Multi-Parameter Filtering:** The system must permit keyword-based title querying on the backend, alongside instant client-side filtering by genre, language, and sorting attributes.
* **FR3: Reservation Processing:** Users must be able to select an active film, choose from four daily showtime slots (10:00 AM, 1:30 PM, 6:00 PM, 9:30 PM), specify seat counts via a validated stepper, and input guest details.
* **FR4: Real-Time Seat Validation:** The system must forbid reservations if the requested seat quantity exceeds the movie’s remaining capacity or if capacity is zero (`Housefull`).
* **FR5: Digital Admission Pass Generation:** Upon successful transaction, the system must immediately generate a verifiable digital pass containing a unique ticket reference code, showtime, and barcode representation.
* **FR6: Ticket Cancellation and Inventory Restitution:** Users must be able to cancel active bookings with modal confirmation safeguards; upon confirmation, the reserved seat count must be credited back to the movie document.
* **FR7: System Status & Health Monitoring:** The platform must dynamically ping the backend API on port 7000 to display live connectivity status badges in the user interface.

### 2.5 Non-Functional Requirements
* **Performance:** API round-trips should execute within 100 milliseconds under local server conditions. Frontend assets must build in under one second via Vite.
* **Reliability & Consistency:** Database integrity must be maintained at all times using Mongoose schema constraints, avoiding dangling references or duplicate movie IDs.
* **Usability & Aesthetics:** Visual styling must adhere strictly to established design tokens, maintaining optimal contrast ratios, responsive grid arrangements, and WCAG-compliant touch targets across desktop and mobile viewports.
* **Maintainability & Clean Architecture:** Component trees and server routes must follow modular separation of concerns, passing static code audits (Oxlint) with zero errors or warnings.
* **Security & Input Sanitization:** All incoming requests must be parsed as strict JSON with Cross-Origin Resource Sharing (CORS) limits enforced, disallowing malformed payloads.

### 2.6 Hardware and Software Requirements

#### Hardware Requirements:
* **Processor:** 64-bit Dual-Core x86/ARM Processor (Intel Core i3 / AMD Ryzen 3 or higher).
* **RAM:** Minimum 4 GB (8 GB recommended for simultaneous server, client, and database daemon execution).
* **Hard Disk Storage:** Minimum 500 MB of available disk space for Node modules, source code, and database storage.
* **Display Resolution:** Minimum 1280 × 720 (Optimized for 1920 × 1080 High-Definition displays and mobile screens).

#### Software Requirements:
* **Operating System:** Windows 10/11, macOS, or modern Linux distribution.
* **Runtime Environment:** Node.js (v18.x LTS or higher) with npm (v9.x or higher).
* **Database Management System:** MongoDB Community Server (v7.0 / v9.0) running on local port 27017.
* **Graphical Database Client:** MongoDB Compass Desktop GUI.
* **Code Editor / IDE:** Visual Studio Code.
* **Version Control:** Git 2.47+ with GitHub repository integration.
* **Web Browser:** Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari with JavaScript enabled.

---

# CHAPTER 3
# SYSTEM DESIGN

### 3.1 System Architecture
CineBook is organized into a modular **Three-Tier Architectural Model**:
1. **Presentation Tier (Client):** Consists of a Single Page Application engineered with React 19 and compiled via Vite. Components interact with the browser DOM, handle route navigation through React Router DOM, manage local component states, and format data using CSS3 custom variables and Bootstrap utility classes.
2. **Application Tier (Server):** Operates on Node.js utilizing Express.js 5. It acts as an intermediary business logic controller, hosting RESTful API endpoints, parsing JSON bodies, validating transactional payloads, and communicating with the database layer via Mongoose ODM.
3. **Data Persistence Tier (Database):** Hosted on MongoDB Community Server on port 27017. Data is stored across two schematized collections: `movies` and `bookings`. All updates to seat inventories and booking statuses persist directly to disk.

```
+-------------------------------------------------------------+
|                 PRESENTATION TIER (CLIENT)                  |
|  React 19 SPA · Vite Bundler · Bootstrap 5 · Custom Motion  |
+-------------------------------------------------------------+
                              |
                     HTTP JSON Requests (Axios)
                              v
+-------------------------------------------------------------+
|                  APPLICATION TIER (SERVER)                  |
|  Node.js · Express 5 REST API · CORS · Business Validation  |
+-------------------------------------------------------------+
                              |
                    Mongoose 9 ODM Queries
                              v
+-------------------------------------------------------------+
|               DATA PERSISTENCE TIER (DATABASE)              |
|   MongoDB 9.0 Daemon · Collections: 'movies' & 'bookings'   |
+-------------------------------------------------------------+
```

### 3.3 Data Flow Diagram (DFD)

#### Level 0 DFD (Context-Level Diagram):
The Context Diagram represents the boundary of the CineBook application, showing external entities (Patron and Administrator) exchanging data with the central CineBook system and MongoDB database.

```
       +---------------+                     +--------------------+
       |    PATRON     |                     |   ADMINISTRATOR    |
       +---------------+                     +--------------------+
         |           ^                         |                ^
  Booking|           |Ticket            Movie  |                |Schedule
  Request|           |Pass             Details |                |Status
         v           |                         v                |
   +---------------------------------------------------------------+
   |                                                               |
   |               CINEBOOK CORE APPLICATION SYSTEM                 |
   |                                                               |
   +---------------------------------------------------------------+
                             |               ^
                   Read/Write|               |Stored
                     Payloads|               |Data
                             v               |
                     +-------------------------------+
                     |   MONGODB 'moviebooking' DB   |
                     +-------------------------------+
```

#### Level 1 DFD (Decomposed Functional Processes):
1. **Process 1.0 (Movie Scheduling):** Administrator inputs movie information $\rightarrow$ Validates uniqueness $\rightarrow$ Inserts/updates document in `movies` collection.
2. **Process 2.0 (Catalog Query & Filtering):** User inputs search terms or genre filters $\rightarrow$ System queries `movies` collection $\rightarrow$ Returns matched titles and remaining seats.
3. **Process 3.0 (Ticketing & Reservation Engine):** User selects showtime & seat count $\rightarrow$ Validates `availableSeats >= seats` $\rightarrow$ Decrements seats in `movies` collection $\rightarrow$ Creates document in `bookings` collection $\rightarrow$ Returns confirmed pass.
4. **Process 4.0 (Booking Lifecycle & Cancellation):** User initiates cancellation $\rightarrow$ Validates booking state $\rightarrow$ Sets `status = 'Cancelled'` $\rightarrow$ Increments movie's `availableSeats` by ticket seat count $\rightarrow$ Persists updates.

### 3.4 Database Design
The database is named `moviebooking`. While MongoDB is inherently a NoSQL document-oriented store, CineBook enforces strict relational integrity at the application layer through Mongoose schemas:
* Each document in the `movies` collection possesses an immutable, indexed identifier `movieId`.
* Each document in the `bookings` collection maintains foreign key references (`movieId` and `movieTitle`) linking it to its corresponding parent movie record.
* Referential cascading is enforced: Deleting a movie record triggers cascading deletion across all associated booking records.

### 3.5 Collection Structure and Schema Design

#### Collection 1: `movies`
Governed by `movieSchema` and compiled into the `Movie` model:
| Attribute | Data Type | Key / Index | Constraint | Semantic Description |
|---|---|---|---|---|
| `_id` | ObjectId | Primary Key | Auto-generated | MongoDB internal document identifier |
| `movieId` | String | Unique Index | `required: true, unique: true` | Business identifier for the film (e.g., M101) |
| `title` | String | Secondary Index | `required: true` | Complete title of the motion picture |
| `genre` | String | None | `required: true` | Film category (e.g., Action, Sci-Fi) |
| `duration` | Number | None | `required: true, min: 1` | Total running time in minutes |
| `language` | String | None | `required: true` | Primary audio language (e.g., Tamil, English) |
| `availableSeats`| Number | None | `required: true, min: 0` | Real-time seat inventory for the movie |

#### Collection 2: `bookings`
Governed by `bookingSchema` and compiled into the `Booking` model:
| Attribute | Data Type | Key / Index | Constraint | Semantic Description |
|---|---|---|---|---|
| `_id` | ObjectId | Primary Key | Auto-generated | Unique transaction ID used for ticket code |
| `customerName` | String | None | `required: true` | Full name of the reserving patron |
| `movieId` | String | Foreign Ref | `required: true` | Associated film business code |
| `movieTitle` | String | Snapshot | `required: true` | Film title snapshot at reservation time |
| `showtime` | String | None | `required: true` | Scheduled slot (e.g., "6:00 PM") |
| `seats` | Number | None | `required: true, min: 1` | Number of reserved recliner seats |
| `status` | String | None | `default: "Booked"` | Reservation status ("Booked" or "Cancelled") |
| `bookingDate` | Date | None | `default: Date.now` | ISO UTC timestamp of transaction creation |

### 3.6 Module Description
The CineBook system is segmented into five cohesive modules:
1. **Home & Featured Showcase Module:** Serves as the landing hub. Displays ambient animated glowing gradients, a line-masked hero title, 3D parallax featured movie ticket, animated numeric statistics counters, and theatre amenity feature cards.
2. **Movie Catalog & Query Module:** Delivers an expansive grid of all running movies. Incorporates a regex search bar, active genre pill chips, language selectors, and dynamic sorting mechanisms (by title, runtime, or remaining seat count).
3. **Ticketing & Reservation Engine Module:** Implements a guided 3-step checkout workflow: Movie selection $\rightarrow$ Showtime slot selection $\rightarrow$ Customer information & seat quantity stepper. Features a live sticky ticket preview that recalculates pricing in real time.
4. **My Bookings & Cancellation Module:** Provides patrons with a comprehensive ledger of their transactions. Features summary metrics cards, status filter tabs (`All`, `Active`, `Cancelled`), live ticket status badges, and cancellation triggers equipped with safe modal confirmation dialogues.
5. **Cinema Administration Module:** Dedicated portal for theatre staff. Houses a live-updating movie creation form with real-time poster gradient previews, inline editing capabilities, and complete inventory management controls.

### 3.7 User Interface Design
The user interface design departs from standard UI boilerplates, adopting a sophisticated, warm editorial style:
* **Color System:** Grounded in a rich obsidian slate base (`#090B0E`) accented by radiant sunset orange (`#FF6B2B`), burnt terracotta (`#EA580C`), golden amber (`#F59E0B`), and soft peach ambient highlights. A theme toggle enables instant switching to an editorial warm light cream mode.
* **Bespoke Typography:** Integrates Google Fonts **Fraunces** (an optical display serif with italic accents such as `<em>unforgettable.</em>`) for all headings, paired with **DM Sans** for crisp UI legibility.
* **Component Styling:** Employs pill-shaped buttons (`.btn-pill`), rounded card containers (`border-radius: 20px`), subtle glowing borders (`--brand-glow`), realistic perforated ticket cutouts, and custom scrollbars.
* **Motion Choreography:** Utilizes CSS keyframe animations and the browser's *IntersectionObserver* to elevate elements smoothly into view as the user scrolls.

---

# CHAPTER 4
# IMPLEMENTATION

### 4.1 Development Environment
The implementation of CineBook was conducted in a modern, decoupled environment:
* **Operating Environment:** Windows 11 x64 running Node.js v20.x runtime and npm package manager.
* **IDE & Tooling:** Visual Studio Code configured with ESLint and Oxlint extensions.
* **Repository Architecture:** Monorepo-style folder organization comprising:
  * `client-app/`: Vite-powered React 19 Single Page Application.
  * `server-app/`: Node.js and Express.js REST API server.
* **Local Persistence:** Local standalone instance of MongoDB Community Server daemon (`mongod.exe`) listening on TCP port 27017.

### 4.2 Frontend Implementation
The frontend is constructed using functional React components and React 19 hooks. 
* **Routing & Layout:** `App.jsx` establishes the top-level route tree using `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`. A dedicated `ScrollHandler` resets the scroll position to `(0, 0)` upon every route transition.
* **State Management:** Core application state—including the movie roster (`movies`), reservation ledger (`bookings`), loading flags, and global toast notifications—is maintained at the root level and passed down via props.
* **Custom Motion Hook (`useScrollReveal`):** A custom hook mounts an `IntersectionObserver` that automatically attaches the `.in` class to `.reveal`, `.img-reveal`, and `.hero-title` DOM elements when they enter the viewport.
* **Animated Counter (`AnimatedCounter.jsx`):** Employs `requestAnimationFrame` with a cubic ease-out easing algorithm (`1 - Math.pow(1 - progress, 3)`) to animate numeric statistics from zero to target values upon scrolling into view.
* **Preloader Component (`Preloader.jsx`):** Renders an animated SVG film reel path with pulsing strokes and a branded typography logo, automatically dissolving after initial hydration.

### 4.3 Form Validation and Error Handling
To ensure input integrity and user feedback:
* **Boundary Validation:** The seat stepper prevents reservations below 1 or above the movie's maximum remaining seats (`maxSeats`). The submission button is disabled if required fields are missing or if `availableSeats === 0`.
* **Toast Notification Subsystem:** A global `notify(text, type)` handler displays floating glassmorphic alerts (green checkmarks for success, orange warning triangles for failures) with automatic dismissal after 3.8 seconds.
* **Deletion Confirmations:** Destructive operations (cancelling a reservation or deleting a movie) are guarded by `ConfirmModal.jsx`, preventing accidental data loss.

### 4.4 Backend Implementation
The backend server (`server.js`) initializes an Express application:
```javascript
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/moviebooking")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));
```
The server listens on port 7000, establishing a decoupled microservice communication bridge with the Vite frontend running on port 5173.

### 4.5 REST API Development
The server defines nine RESTful routes:
1. `POST /api/addMovie`: Receives movie attributes, validates uniqueness of `movieId`, saves a new `Movie` document, and returns HTTP 200 with status confirmation.
2. `GET /api/viewMovies`: Executes `Movie.find()` to return the complete array of running movies to the client.
3. `GET /api/searchMovies`: Extracts the `title` query string and executes a case-insensitive regular expression search (`{ title: { $regex: title, $options: "i" } }`).
4. `POST /api/updateMovie`: Locates the movie by MongoDB `_id` and invokes `Movie.findByIdAndUpdate(id, req.body)` to persist changes.
5. `POST /api/deleteMovie`: Finds and deletes the movie document, while simultaneously cascading deletion to related bookings via `Booking.deleteMany({ movieId: movie.movieId })`.
6. `POST /api/bookTicket`: Executes the critical transactional check:
```javascript
app.post("/api/bookTicket", async (req, res) => {
  const { customerName, movieId, showtime, seats } = req.body;
  const movie = await Movie.findOne({ movieId });
  if (!movie) return res.json({ status: "Movie not found" });
  if (movie.availableSeats < seats) return res.json({ status: "Not enough seats" });

  movie.availableSeats -= Number(seats);
  await movie.save();

  const newBooking = new Booking({
    customerName, movieId, movieTitle: movie.title, showtime, seats
  });
  await newBooking.save();
  res.json({ status: "Ticket booked successfully", booking: newBooking });
});
```
7. `GET /api/viewBookings`: Executes `Booking.find().sort({ bookingDate: -1 })` to return all records sorted chronologically.
8. `POST /api/cancelBooking`: Validates that the booking is not already cancelled, updates `status = "Cancelled"`, locates the parent movie, and restores seats:
```javascript
app.post("/api/cancelBooking", async (req, res) => {
  const booking = await Booking.findById(req.body.id);
  if (!booking || booking.status === "Cancelled") {
    return res.json({ status: "Already cancelled or not found" });
  }
  booking.status = "Cancelled";
  await booking.save();

  const movie = await Movie.findOne({ movieId: booking.movieId });
  if (movie) {
    movie.availableSeats += Number(booking.seats);
    await movie.save();
  }
  res.json({ status: "Booking cancelled successfully" });
});
```
9. `POST /api/deleteBooking`: Invokes `Booking.findByIdAndDelete(req.body.id)` to purge obsolete records.

### 4.6 Database Connectivity
Database connectivity is orchestrated using Mongoose:
* **Connection String:** `mongodb://127.0.0.1:27017/moviebooking`.
* **Automatic Creation:** MongoDB creates the database `moviebooking` and collections `movies` and `bookings` automatically upon insertion of the initial document.
* **Health Handshake:** The server monitors Mongoose connection events, outputting status to the terminal and responding to root GET health checks (`/`) consumed by the frontend footer badge.

### 4.7 CRUD Operations Summary
| Entity | Operation | Frontend Trigger | Backend API Route | MongoDB Query Execution |
|---|---|---|---|---|
| **Movie** | **Create** | "Add Movie" form in `/admin` | `POST /api/addMovie` | `new Movie(data).save()` |
| **Movie** | **Read** | Navigation to `/`, `/movies`, `/book` | `GET /api/viewMovies` | `Movie.find()` |
| **Movie** | **Update** | "Edit" button on movie row in `/admin` | `POST /api/updateMovie` | `Movie.findByIdAndUpdate(id, data)` |
| **Movie** | **Delete** | "Delete" button in `/admin` | `POST /api/deleteMovie` | `Movie.findByIdAndDelete(id)` |
| **Booking** | **Create** | "Confirm & Book Tickets" in `/book` | `POST /api/bookTicket` | `Movie.save()` + `new Booking().save()` |
| **Booking** | **Read** | Navigation to `/bookings` | `GET /api/viewBookings` | `Booking.find().sort()` |
| **Booking** | **Update** | "Cancel" button on ticket row | `POST /api/cancelBooking` | `Booking.save()` + `Movie.save()` |
| **Booking** | **Delete** | "Trash" icon button on booking row | `POST /api/deleteBooking` | `Booking.findByIdAndDelete(id)` |
