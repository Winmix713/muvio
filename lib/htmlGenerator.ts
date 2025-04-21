export const generateHtmlContent = (matches: any[], teams: any[], stats: any): string => {
  return `<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinMix.hu - Mérkőzés Előrejelzések</title>
    <meta name="description" content="Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobb helyezésért.">
    <meta property="og:title" content="WinMix.hu - Mérkőzés Előrejelzések">
    <meta property="og:description" content="Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobb helyezésért.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://winmix.hu">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6'/%3E%3Cpath d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18'/%3E%3Cpath d='M4 22h16'/%3E%3Cpath d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'/%3E%3Cpath d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'/%3E%3Cpath d='M18 2H6v7a6 6 0 0 0 12 0V2Z'/%3E%3C/svg%3E">
    
    <!-- Preload Inter font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        :root {
            --background: #0b0f19;
            --foreground: #f1f5f9;
            --card: #111827;
            --card-foreground: #f1f5f9;
            --border: rgba(255, 255, 255, 0.1);
            --primary: #3b82f6;
            --primary-hover: #2563eb;
            --secondary: rgba(30, 41, 59, 0.5);
            --muted: rgba(51, 65, 85, 0.5);
            --muted-foreground: #94a3b8;
            --accent: rgba(59, 130, 246, 0.2);
            --accent-foreground: #60a5fa;
            --destructive: #f43f5e;
            --destructive-foreground: #f1f5f9;
            --radius: 0.5rem;
        }
        
        body {
            line-height: 1.6;
            color: var(--foreground);
            background-color: var(--background);
            background-image: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.2), rgba(17, 24, 39, 0.05), transparent);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        /* Typography */
        h1, h2, h3, h4, h5, h5 {
            font-weight: 700;
            line-height: 1.2;
        }
        
        h1 {
            font-size: 2.5rem;
        }
        
        h2 {
            font-size: 1.75rem;
        }
        
        h3 {
            font-size: 1.5rem;
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        a {
            color: var(--primary);
            text-decoration: none;
            transition: color 0.2s ease;
        }
        
        a:hover {
            color: var(--primary-hover);
        }
        
        /* Container */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        /* Utilities */
        .text-center {
            text-align: center;
        }
        
        .text-gradient {
            background: linear-gradient(to right, var(--foreground), #93c5fd);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .text-blue {
            color: var(--primary);
        }
        
        .bg-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .shadow-soft {
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        /* Header */
        header {
            padding: 1rem 0;
            background-color: rgba(11, 15, 25, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            border-bottom: 1px solid var(--border);
            transition: all 0.3s ease;
        }
        
        .header-scrolled {
            padding: 0.75rem 0;
            background-color: rgba(11, 15, 25, 0.9);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 1.25rem;
            color: var(--foreground);
        }
        
        .logo-icon {
            background: linear-gradient(to bottom right, var(--primary), #4f46e5);
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 0.375rem;
            position: relative;
            overflow: hidden;
        }
        
        .logo-icon:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.375rem;
        }
        
        .nav-items {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .nav-item {
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius);
            transition: background-color 0.2s ease;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
        }
        
        .nav-item:hover {
            background-color: var(--muted);
        }
        
        .profile-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background-color: var(--muted);
            border-radius: var(--radius);
            transition: background-color 0.2s ease;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
            cursor: pointer;
        }
        
        .profile-button:hover {
            background-color: rgba(51, 65, 85, 0.7);
        }
        
        .avatar {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Main content */
        main {
            padding: 8rem 0 4rem;
            position: relative;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 4rem;
            animation: fadeIn 0.8s ease forwards;
        }
        
        .hero h1 {
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.125rem;
            color: var(--muted-foreground);
            max-width: 600px;
            margin: 0 auto 2rem;
        }
        
        /* Stats card */
        .stats-card {
            margin-bottom: 3rem;
            animation: fadeIn 1s ease 0.2s both;
        }
        
        .stats-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .stats-header h2 {
            font-size: 1.25rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .stats-header h2 svg {
            color: var(--primary);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        
        .stat-item {
            padding: 1.5rem;
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            text-align: center;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        
        .stat-item:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--foreground);
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            font-weight: 500;
        }
        
        /* Matches */
        .matches-section {
            animation: fadeIn 1.2s ease 0.4s both;
        }
        
        .matches-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .matches-title {
            font-size: 1.25rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .matches-title svg {
            color: #fbbf24;
        }
        
        .date-display {
            display: flex;
            align-items: center;
            padding: 0.5rem 0.75rem;
            background-color: var(--muted);
            border-radius: var(--radius);
            font-size: 0.875rem;
            gap: 0.5rem;
        }
        
        .date-display svg {
            color: var(--primary);
        }
        
        /* Match cards */
        .matches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }
        
        .match-card {
            background-color: var(--card);
            border-radius: var(--radius);
            overflow: hidden;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
        }
        
        .match-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
        
        .match-header {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border);
        }
        
        .match-time {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.375rem;
        }
        
        .match-time svg {
            color: var(--primary);
        }
        
        .match-time-tag {
            background-color: var(--accent);
            color: var(--accent-foreground);
            padding: 0.125rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
        }
        
        .match-content {
            padding: 1.5rem 1rem;
        }
        
        .teams-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .team {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 45%;
        }
        
        .team-logo {
            width: 4rem;
            height: 4rem;
            margin-bottom: 0.75rem;
            object-fit: contain;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 0.375rem;
            transition: transform 0.3s ease;
        }
        
        .match-card:hover .team-logo {
            transform: scale(1.1);
        }
        
        .team-name {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0.25rem;
        }
        
        .team-rank {
            color: var(--muted-foreground);
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
        }
        
        .vs {
            font-weight: 700;
            color: var(--muted-foreground);
            font-size: 1.25rem;
            position: relative;
        }
        
        .vs:before, .vs:after {
            content: '';
            position: absolute;
            height: 1px;
            width: 10px;
            background-color: var(--border);
            top: 50%;
        }
        
        .vs:before {
            right: calc(100% + 5px);
        }
        
        .vs:after {
            left: calc(100% + 5px);
        }
        
        .match-actions {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
        }
        
        .match-button {
            flex: 1;
            padding: 0.625rem;
            border-radius: var(--radius);
            font-weight: 600;
            font-size: 0.875rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            outline: none;
        }
        
        .home-button {
            background-color: var(--accent);
            color: var(--accent-foreground);
        }
        
        .home-button:hover {
            background-color: rgba(59, 130, 246, 0.3);
        }
        
        .draw-button {
            background-color: rgba(148, 163, 184, 0.2);
            color: #cbd5e1;
        }
        
        .draw-button:hover {
            background-color: rgba(148, 163, 184, 0.3);
        }
        
        .away-button {
            background-color: rgba(99, 102, 241, 0.2);
            color: #818cf8;
        }
        
        .away-button:hover {
            background-color: rgba(99, 102, 241, 0.3);
        }
        
        /* Features */
        .features-section {
            padding: 4rem 0;
            animation: fadeIn 1.4s ease 0.6s both;
        }
        
        .features-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .features-header h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .features-header p {
            font-size: 1.125rem;
            color: var(--muted-foreground);
            max-width: 700px;
            margin: 0 auto;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            padding: 2rem;
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            transition: transform 0.3s ease, border-color 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
        }
        
        .feature-icon {
            background-color: var(--accent);
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        
        .feature-icon svg {
            color: var(--primary);
            width: 1.5rem;
            height: 1.5rem;
        }
        
        .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }
        
        .feature-description {
            color: var(--muted-foreground);
            flex: 1;
        }
        
        /* CTA Section */
        .cta-section {
            padding: 5rem 0;
            text-align: center;
            animation: fadeIn 1.6s ease 0.8s both;
        }
        
        .cta-content {
            max-width: 700px;
            margin: 0 auto;
        }
        
        .cta-content h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
        }
        
        .cta-content p {
            font-size: 1.25rem;
            color: var(--muted-foreground);
            margin-bottom: 2.5rem;
        }
        
        .cta-button {
            background-color: var(--primary);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: var(--radius);
            font-weight: 600;
            font-size: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .cta-button:hover {
            background-color: var(--primary-hover);
        }
        
        /* Footer */
        footer {
            padding: 2rem 0;
            border-top: 1px solid var(--border);
            background-color: rgba(11, 15, 25, 0.95);
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .footer-logo-icon {
            background: linear-gradient(to bottom right, var(--primary), #4f46e5);
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.375rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 0.25rem;
        }
        
        .copyright {
            font-size: 0.75rem;
            color: var(--muted-foreground);
        }
        
        .social-links {
            display: flex;
            gap: 1rem;
        }
        
        .social-link {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: var(--muted);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease;
        }
        
        .social-link:hover {
            background-color: var(--primary);
        }
        
        .social-link svg {
            width: 1rem;
            height: 1rem;
            color: var(--foreground);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .matches-grid {
                grid-template-columns: 1fr;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .matches-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 1.5rem;
                text-align: center;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .cta-content h2 {
                font-size: 2rem;
            }
        }
        
        @media (max-width: 640px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-items {
                display: none;
            }
            
            .logo {
                font-size: 1rem;
            }
            
            .hero h1 {
                font-size: 1.75rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <header id="header">
        <div class="container header-content">
            <div class="logo">
                <div class="logo-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                </div>
                <div>Win<span class="text-blue">Mix.hu</span></div>
            </div>
            
            <div class="nav-items">
                <a href="#matches" class="nav-item">Mérkőzések</a>
                <a href="#features" class="nav-item">Funkciók</a>
                <a href="#cta" class="nav-item">Indulás</a>
            </div>
            
            <div class="profile-button">
                <div class="avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <span>Profil</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"></path>
                </svg>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <h1 class="text-gradient">Tippelj Futball <span>Mérkőzésekre</span></h1>
                <p>Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobbakkal.</p>
            </section>

            <section class="stats-card">
                <div class="stats-header">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 21v-4.94c0-.61.44-1.09 1.002-1.085C10.174 14.99 11 15.89 11 17v4l3.5-2.5L18 21V4a2 2 0 0 0-2-2H8.5a2.5 2.5 0 0 0 0 5H11c.85 0 1.38-.63 1.5-1.5.5-4 6.5-4 7 0 .16 1.35-.3 2.5-1.5 3 .5.5 2 1.5 2 3 0 2-1.5 3-3.5 3-2.11 0-4.5-.33-5.5-.5C10.5 12 9 12.5 9 14v2"></path>
                        </svg>
                        Statisztikáid
                    </h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">${stats.totalPredictions}</div>
                        <div class="stat-label">Összes tipp</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.winRate}%</div>
                        <div class="stat-label">Nyerési arány</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.points}</div>
                        <div class="stat-label">Összes pont</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.streak}</div>
                        <div class="stat-label">Jelenlegi sorozat</div>
                    </div>
                </div>
            </section>

            <section id="matches" class="matches-section">
                <div class="matches-header">
                    <h2 class="matches-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                        </svg>
                        Mai mérkőzések
                    </h2>
                    
                    <div class="date-display">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                            <line x1="16" x2="16" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="2" y2="6"></line>
                            <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        ${new Date().toLocaleDateString("hu-HU", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </div>
                </div>

                <div class="matches-grid">
                    ${matches
                      .map(
                        (match) => `
                    <div class="match-card">
                        <div class="match-header">
                            <div class="match-time">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${match.time}
                            </div>
                            <div class="match-time-tag">
                                ${match.startsIn}
                            </div>
                        </div>
                        <div class="match-content">
                            <div class="teams-container">
                                ${
                                  match.homeTeam
                                    ? `
                                <div class="team">
                                    <img src="${match.homeTeam.logo}" alt="${match.homeTeam.name}" class="team-logo">
                                    <div class="team-name">${match.homeTeam.name}</div>
                                    <div class="team-rank">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        Rank #${match.homeTeam.rank}
                                    </div>
                                </div>
                                `
                                    : ""
                                }
                                <div class="vs">VS</div>
                                ${
                                  match.awayTeam
                                    ? `
                                <div class="team">
                                    <img src="${match.awayTeam.logo}" alt="${match.awayTeam.name}" class="team-logo">
                                    <div class="team-name">${match.awayTeam.name}</div>
                                    <div class="team-rank">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        Rank #${match.awayTeam.rank}
                                    </div>
                                </div>
                                `
                                    : ""
                                }
                            </div>
                            <div class="match-actions">
                                <button class="match-button home-button">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                    Hazai
                                </button>
                                <button class="match-button draw-button">Döntetlen</button>
                                <button class="match-button away-button">
                                    Vendég
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 4px;">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    `,
                      )
                      .join("")}
                </div>
            </section>

            <section id="features" class="features-section">
                <div class="features-header">
                    <h2 class="text-gradient">Miért válaszd a WinMix.hu-t?</h2>
                    <p>Tippelj saját tempódban, elemezd a statisztikákat és versenyezz másokkal a legtöbb pontért.</p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Versenyezz barátaiddal</h3>
                        <p class="feature-description">Hozz létre saját ligákat, hívd meg barátaidat és versenyezz azonnali ranglistákkal.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2v20"></path>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Nyereményrendszer</h3>
                        <p class="feature-description">Gyűjts pontokat helyes tippjeiddel és válts be őket értékes nyereményekre.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Részletes elemzések</h3>
                        <p class="feature-description">Ismerd meg a csapatok formáját, egymás elleni mérkőzéseit és az aktuális bajnokságot.</p>
                    </div>
                </div>
            </section>

            <section id="cta" class="cta-section">
                <div class="cta-content">
                    <h2 class="text-gradient">Készen állsz a tippelésre?</h2>
                    <p>Regisztrálj most és kezdj el tippelni kedvenc futball mérkőzéseidre. Szerezz pontokat és mutasd meg tudásodat!</p>
                    <button class="cta-button">
                        Regisztráció
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container footer-content">
            <div class="footer-logo">
                <div class="footer-logo-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                </div>
                <span>Win<span style="color: #3b82f6;">Mix.hu</span></span>
            </div>
            
            <div class="social-links">
                <a href="#" class="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                </a>
            </div>
            
            <div class="copyright">
                &copy; ${new Date().getFullYear()} WinMix.hu. Minden jog fenntartva.
            </div>
        </div>
    </footer>

    <script>
        // Simple header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
        
        // Add click handlers for match buttons
        const matchButtons = document.querySelectorAll('.match-button');
        matchButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.match-card');
                const allButtons = card.querySelectorAll('.match-button');
                
                // Reset all buttons
                allButtons.forEach(btn => {
                    btn.style.opacity = '0.7';
                    btn.style.transform = 'scale(1)';
                });
                
                // Highlight selected button
                this.style.opacity = '1';
                this.style.transform = 'scale(1.05)';
                
                // Simulate saving the prediction
                const prediction = this.classList.contains('home-button') ? 'Hazai' : 
                                  this.classList.contains('draw-button') ? 'Döntetlen' : 'Vendég';
                                  
                // You would typically send this to a server
                console.log('Prediction saved:', prediction);
                
                // Show feedback to user
                const toast = document.createElement('div');
                toast.textContent = 'Tipp elmentve: ' + prediction;
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.right = '20px';
                toast.style.padding = '10px 20px';
                toast.style.backgroundColor = 'var(--primary)';
                toast.style.color = 'white';
                toast.style.borderRadius = 'var(--radius)';
                toast.style.zIndex = '1000';
                toast.style.animation = 'fadeIn 0.3s forwards';
                
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(10px)';
                    toast.style.transition = 'opacity 0.3s, transform 0.3s';
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 3000);
            });
        });
    </script>
</body>
</html>`
}

