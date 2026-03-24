(function ($) {
    "use strict";

    var pageContent = {
        servicii: {
            kicker: "Ce facem",
            title: "Servicii creative complete",
            intro: "Construim proiecte artistice si digitale de la idee la executie pentru branduri, institutii si evenimente culturale.",
            cards: [
                {
                    title: "Identitate vizuala",
                    text: "Cream directii vizuale clare, ghiduri de brand si materiale de comunicare care arata profesionist.",
                    bullets: ["Logo si guideline", "Paleta cromatica", "Kit social media"]
                },
                {
                    title: "Productie vizuala",
                    text: "Realizam continut foto-video pentru lansari, campanii si arhiva culturala.",
                    bullets: ["Filmari short-form", "Fotografie editoriala", "Post-productie"]
                },
                {
                    title: "Web pentru portofoliu",
                    text: "Design si implementare pentru pagini de prezentare care se incarca rapid pe mobil.",
                    bullets: ["Landing pages", "Copy orientat pe conversie", "Optimizare UX"]
                },
                {
                    title: "Consultanta curatoriala",
                    text: "Conectam ideea artistica cu publicul potrivit si planificam traseul de expunere.",
                    bullets: ["Concept expozitional", "Plan editorial", "Calendar campanie"]
                }
            ]
        },
        proiecte: {
            kicker: "Portofoliu",
            title: "Proiecte recente",
            intro: "Am selectat lucrari in care am combinat arta contemporana, povesti locale si executie tehnica riguroasa.",
            cards: [
                {
                    title: "Oras in Cadre",
                    text: "Mini-serie vizuala despre arhitectura urbana din Chisinau.",
                    bullets: ["12 episoade", "40.000+ vizualizari", "Lansare pe social"]
                },
                {
                    title: "Moldova in Texturi",
                    text: "Instalatie multimedia cu elemente textile reinterpretate in format digital.",
                    bullets: ["Parteneriat educational", "Expozitie itineranta", "Catalog online"]
                },
                {
                    title: "Nopti de Atelier",
                    text: "Campanie pentru evenimente live cu artisti emergenti si sesiuni deschise publicului.",
                    bullets: ["Branding complet", "Acreditari media", "Asset pack eveniment"]
                },
                {
                    title: "Pulse 24",
                    text: "Microsite pentru maraton de creatie de 24 ore cu program si galerie live.",
                    bullets: ["UX orientat pe agenda", "Integrare formular", "Statistici trafic"]
                }
            ]
        },
        echipa: {
            kicker: "Oameni",
            title: "Echipa din spatele atelierului",
            intro: "Suntem o echipa mica, rapida si atenta la detalii, fiecare cu rol clar in procesul de productie.",
            cards: [
                {
                    title: "Ilie - Creative Lead",
                    text: "Coordoneaza directia vizuala, brief-urile si coerenta narativa a proiectelor.",
                    bullets: ["Art direction", "Pitch vizual", "Feedback iterativ"]
                },
                {
                    title: "Ana - Content Strategist",
                    text: "Transforma insight-urile in mesaje clare pentru public si parteneri.",
                    bullets: ["Tone of voice", "Plan de continut", "Structura pagini"]
                },
                {
                    title: "Victor - Frontend Developer",
                    text: "Construieste interfete rapide, responsive si usor de mentinut.",
                    bullets: ["HTML/CSS/JS", "Animatii discrete", "Optimizare performanta"]
                },
                {
                    title: "Mira - Producer",
                    text: "Planifica executia, termenele si relatia cu colaboratorii externi.",
                    bullets: ["Timeline", "Bugete", "Logistica evenimente"]
                }
            ]
        },
        evenimente: {
            kicker: "Agenda",
            title: "Evenimente si activari",
            intro: "Organizam sesiuni deschise, workshop-uri si mini-expozitii pentru comunitate, studenti si profesionisti.",
            cards: [
                {
                    title: "Open Studio Friday",
                    text: "In fiecare vineri, atelierul este deschis pentru feedback pe proiecte personale.",
                    bullets: ["Acces gratuit", "18:00 - 21:00", "Locuri limitate"]
                },
                {
                    title: "Workshop de Storytelling Vizual",
                    text: "Cum transformi o idee in serie coerenta de imagini pentru social media.",
                    bullets: ["Durata 3 ore", "Exercitii practice", "Template bonus"]
                },
                {
                    title: "Noaptea Portofoliilor",
                    text: "Sesiune speciala cu review individual pentru artisti si designeri la inceput de drum.",
                    bullets: ["Mentori invitati", "Q&A live", "Recomandari personalizate"]
                },
                {
                    title: "Mini Expo in Campus",
                    text: "Expozitie colaborativa cu proiecte studentesti si instalatii multimedia.",
                    bullets: ["Parteneriate locale", "Program ghidat", "Materiale print"]
                }
            ]
        },
        contacte: {
            kicker: "Hai sa vorbim",
            title: "Date de contact si colaborari",
            intro: "Daca ai un proiect, o idee sau vrei o discutie rapida, poti folosi unul dintre canalele de mai jos.",
            cards: [
                {
                    title: "Email direct",
                    text: "Trimite un email cu brief-ul tau si revenim cu urmatorii pasi in maxim 24 ore.",
                    bullets: ["hello@atelier.md", "Subiect recomandat: Colaborare", "Raspuns in aceeasi zi lucratoare"]
                },
                {
                    title: "Telefon",
                    text: "Pentru urgente de productie sau confirmari rapide.",
                    bullets: ["+373 22 000 000", "Luni - Vineri", "09:00 - 18:00"]
                },
                {
                    title: "Locatie",
                    text: "Ne poti vizita in studio pentru o discutie aplicata pe proiect.",
                    bullets: ["Str. Studentilor 9/7", "Chisinau", "Programare in avans"]
                },
                {
                    title: "Social media",
                    text: "Publicam frecvent procese, rezultate si oportunitati de colaborare.",
                    bullets: ["Instagram: @atelier.md", "Behance: atelier-md", "LinkedIn: Atelier MD"]
                }
            ]
        }
    };

    function setActiveLink(page) {
        var links = $(".site-nav a");
        links.removeClass("is-active");

        links.each(function () {
            var href = ($(this).attr("href") || "").toLowerCase();
            if ((page === "acasa" && href.indexOf("index.html") > -1) || href.indexOf(page + ".html") > -1) {
                $(this).addClass("is-active");
            }
        });
    }

    function renderPage(page) {
        var model = pageContent[page];
        var $heroKicker = $("#page-kicker");
        var $heroTitle = $("#page-title");
        var $heroIntro = $("#page-intro");
        var $container = $("#page-content");

        if (!model || !$container.length) {
            return;
        }

        $heroKicker.text(model.kicker);
        $heroTitle.text(model.title);
        $heroIntro.text(model.intro);

        $container.empty();

        model.cards.forEach(function (card, index) {
            var bulletHtml = card.bullets.map(function (bullet) {
                return "<li>" + bullet + "</li>";
            }).join("");

            var $card = $(
                '<article class="info-card">' +
                    "<h3>" + card.title + "</h3>" +
                    "<p>" + card.text + "</p>" +
                    '<ul class="info-list">' + bulletHtml + "</ul>" +
                "</article>"
            );

            $container.append($card);

            setTimeout(function () {
                $card.addClass("is-visible");
            }, 80 * (index + 1));
        });
    }

    function initMobileMenu() {
        var $toggle = $(".site-nav-toggle");
        var $menu = $(".site-nav");

        if (!$toggle.length || !$menu.length) {
            return;
        }

        $toggle.on("click", function () {
            $menu.toggleClass("is-open");
        });
    }

    function updateYear() {
        $(".js-year").text(new Date().getFullYear());
    }

    $(function () {
        var page = ($("body").data("page") || "acasa").toLowerCase();

        setActiveLink(page);
        renderPage(page);
        initMobileMenu();
        updateYear();
    });

})(jQuery);
