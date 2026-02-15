//Passworteingabe
    const correctPassword1 = "ba41e0776ac22a8a5062339a04b58945b1c0fd72c2b6e8fd94414635144a58f1";
    const correctPassword2 = "773b868d9c53ed15806f04e45ec481d0c337636df2ba3deb252592265bb555fb";
    const correctPassword3 = "3483b4c9460907b05e82513b8c965a32b0eb4404aca6da5b8edb8064058eb62f";

    const topMenu = document.getElementById("topMenuBar");
    const tabHoch = document.querySelector('.menuTab[data-menu="hf"]');
    const tabPol = document.querySelector('.menuTab[data-menu="pa"]');
    const tabKon = document.querySelector('.menuTab[data-menu="kon"]');
    const submenuHoch = document.getElementById("submenu-hf");
    const submenuPol = document.getElementById("submenu-pa");
    const submenuKontakt = document.getElementById("submenu-kontakt");

    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    } 
    async function checkPassword() {
      const input = document.getElementById("passwordInput").value;
      const intro = document.getElementById("intro");
      const Hello = document.getElementById("Hello");
      const Anmeldung = document.getElementById("Anmeldung");
      const resultDiv = document.getElementById("result");
      const openFormBtn = document.getElementById("openFormBtn");
      const HochzeitButton = document.getElementById("openHochzeitBtn");
      const output = document.getElementById("output");
      const openPolterabendBtn = document.getElementById("openPolterabendBtn");          
      const inputHash = await sha256(input);
      

      //Subseiten aufbauen je nach Passwort
      if (inputHash !== correctPassword1 && inputHash !== correctPassword2 && inputHash !== correctPassword3) {
        resultDiv.innerHTML = "<p class='error';'>Falsches Passwort </p>";
        return;
      }
      //Eines der Passwörter ist korrekt
      topMenu.classList.remove("hidden");
      Anmeldung.style.display = "none";
      
      if (inputHash === correctPassword1){
        resultDiv.innerHTML = "<p class='success'> Passwort 1 korrekt </p>";
        tabHoch.classList.remove("hidden");
        tabPol.classList.add("hidden");
        tabKon.classList.remove("hidden");
        submenuPol.classList.add("hidden"); 
        kap1.classList.remove("hidden");
        kap2.classList.remove("hidden"); 
        kap3.classList.remove("hidden");
        kap13.classList.remove("hidden");
        document.getElementById("intro").style.display="none";
        document.getElementById("hamburger").classList.remove("hidden");
      } else if (inputHash === correctPassword2) {
        resultDiv.innerHTML = "<p class='success'> Passwort 2 korrekt </p>";
        formPolterabend.style.display = "inline-block";
        tabHoch.classList.remove("hidden");
        tabPol.classList.remove("hidden");
        tabKon.classList.remove("hidden");
        openPolterabendBtn.classList.remove("hidden");
        kap1.classList.remove("hidden");
        kap2.classList.remove("hidden");
        kap3.classList.remove("hidden");
        kap10.classList.remove("hidden");
        kap11.classList.remove("hidden");
        kap12.classList.remove("hidden");
        kap13.classList.remove("hidden");
        document.getElementById("intro").style.display="none";
        document.getElementById("hamburger").classList.remove("hidden");
      } else if(inputHash === correctPassword3) {
        resultDiv.innerHTML = "<p class='success'> Passwort 3 korrekt </p>";
        formPolterabend.style.display ="inline-block";
        tabPol.classList.remove("hidden");
        tabHoch.classList.add("hidden");
        tabKon.classList.remove("hidden");
        submenuHoch.classList.add("hidden"); 
        kap10.classList.remove("hidden");
        kap11.classList.remove("hidden");
        kap12.classList.remove("hidden");
        kap13.classList.remove("hidden");
        document.getElementById("intro").style.display="none";
        document.getElementById("hamburger").classList.remove("hidden");
      }
      //Menu mobil
       //const hamburger = document.getElementById("hamburger");
       //const menu = document.getElementById("topMenuBar");
    
       //hamburger.addEventListener("click", () => {
       //  menu.classList.toggle("open");
       //});
      //Menüband
        
      const tabs = document.querySelectorAll(".menuTab:not(.hidden)");
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const menu = tab.dataset.menu;
    
            // Anzeigen oder ausblenden
            if (menu === "hf") {
                submenuHoch.classList.toggle("hidden");
                submenuKontakt.classList.add("hidden");
                submenuPol.classList.add("hidden");
            }
            if (menu === "pa") {
                submenuPol.classList.toggle("hidden");
                submenuKontakt.classList.add("hidden");
                submenuHoch.classList.add("hidden");
            }
          if (menu === "kon") {
                submenuPol.classList.add("hidden");
                submenuKontakt.classList.toggle("hidden");
                submenuHoch.classList.add("hidden");
            }
          });
      });
    }
      //Button + Enter
      document.getElementById("checkBtn").addEventListener("click", checkPassword);
      document.getElementById("passwordInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") checkPassword();
      });
       //Email

      document.querySelectorAll('.email').forEach(el => {
        el.addEventListener('click', () => {
          navigator.clipboard.writeText(el.dataset.email);
          alert('E-Mail-Adresse kopiert');
        });
      });


    // Submenu-Einträge → Scroll & Menüs schließen
    document.querySelectorAll(".submenu div").forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.dataset.target;
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            submenuHoch.classList.add("hidden");
            submenuPol.classList.add("hidden");
            submenuKontakt.classList.add("hidden");
        });
    });

    //Scrollen und Topmenu verschwindet
    
    let lastScrollY = window.scrollY;
    const menu = document.getElementById('topMenuBar');
  
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll nach unten → Menü verstecken
        menu.classList.add('hide');
      } else {
        // Scroll nach oben → Menü zeigen
        menu.classList.remove('hide');
      }
  
      lastScrollY = currentScrollY;
    });

    //Menü mobile Variante

    if (hamburger && mobileMenu) {
    
        // 1️⃣ Hamburger Klick → Mobile Menü ein-/ausblenden
        hamburger.addEventListener('click', () => {
            // 👉 Sichtbarkeit der Mobile-Menüpunkte an Tabs anpassen
            mobileMenu.querySelectorAll('.mobile-menu-item').forEach(item => {
                const menu = item.dataset.menu;
    
                if (
                    (menu === "hf" && tabHoch.classList.contains("hidden")) ||
                    (menu === "pa" && tabPol.classList.contains("hidden")) ||
                    (menu === "kon" && tabKon.classList.contains("hidden"))
                ) {
                    item.style.display = "none";
                } else {
                    item.style.display = "block";
                }
            });
    
            // Menü ein-/ausblenden
            mobileMenu.style.display =
                mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    
        // 2️⃣ Klick auf mobile Menüpunkt → Submenu ein/ausklappen oder scrollen
        mobileMenu.querySelectorAll('.mobile-menu-item').forEach(item => {
            const submenu = item.querySelector('.submenu');
    
            item.addEventListener('click', (e) => {
                const subItem = e.target.closest('.submenu div');
    
                if (subItem) {
                    // ---- Klick auf Untermenüpunkt ----
                    const targetId = subItem.dataset.target;
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
    
                    // Mobile Menü komplett schließen
                    mobileMenu.style.display = 'none';
    
                    // Alle Submenus schließen
                    document.querySelectorAll('.mobile-menu-item').forEach(i => i.classList.remove('open'));
    
                } else if (submenu) {
                    // ---- Klick auf Hauptmenüpunkt ----
                    // Alle anderen Submenus schließen
                    document.querySelectorAll('.mobile-menu-item').forEach(i => {
                        if (i !== item) i.classList.remove('open');
                    });
    
                    // Dieses Submenu ein-/ausklappen
                    item.classList.toggle('open');
                }
            });
        });
    }



    //Zeitstrahl erscheinen
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {threshold: 0.3 });

    document.querySelectorAll(".event").forEach(event => {
      observer.observe(event);
    });

    
    // =========================
    // FORMULARE ANMELDUNGEN
    // =========================
    const notification = document.getElementById("notification");
    function openPolterabendForm(){
      overlay.classList.remove("hidden");
        popupPolterabend.classList.remove("hidden");
        formPolterabend.classList.remove("hidden");
        downloadViewPol.classList.add("hidden");
        formPolterabend.reset();
        formDataCache=null;
    }
    function closePolterabendForm(){
        overlay.classList.add("hidden");
        popupPolterabend.classList.add("hidden");
        formPolterabend.classList.add("hidden");
        downloadViewPol.classList.add("hidden");
        InformationenPol.classList.add("hidden");
        BegleiterPol.classList.add("hidden");
        MitbringenSection.classList.add("hidden");
        formPolterabend.reset();
        formDataCache=null;
    }
      

    // =========================
    // POLTERABEND
    // =========================
    const scriptURLPolterabend = "https://script.google.com/macros/s/AKfycbxy6wG3-Wyb27Arg1f5BR0uOrGgjuHhU0pkiiwDaTMQJMIVz7YvFKclwxnedEDwg0cIgw/exec";
     document.addEventListener("DOMContentLoaded", () => {
      const openPolterabendBtn = document.getElementById("openPolterabendBtn");
      const overlay = document.getElementById("overlay");
      const closePolterabendBtn = document.getElementById("closeformPolBtn");
      const popupPolterabend = document.getElementById("popupPolterabend");
      const formPolterabend = document.getElementById("formPolterabend");
      const teilnahmeCheckbox = document.getElementById("teilnahmePol");
      const teilnahmeSection = document.getElementById("InformationenPol");
      const begleitungCheckbox = document.getElementById("begleitungPol");
      const begleiterSection = document.getElementById("BegleiterPol");
      const anzahlInput = document.getElementById("anzahlBegleiterPol");
      const container = document.getElementById("begleiterFelder");
      const mitbringenCheckbox = document.getElementById("mitbringen");
      const mitbringenSection = document.getElementById("MitbringenSection");

       //Formular Polterabend öffnen
      openPolterabendBtn.addEventListener("click", () => {
        openPolterabendForm()
      });

       //Formular Polterabend schließen
      closeformPolBtn.addEventListener("click", () => {
        //InformationenHoch.classlist.add("hidden");
        closePolterabendForm();
      });

      // Schließen bei Klick auf Overlay
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closePolterabendForm();  
        }
      });
    
      // --- Anzeige der Teilnahme-Section steuern ---
       if (!teilnahmeCheckbox || !teilnahmeSection) return;
        teilnahmeCheckbox.addEventListener("change", () => {
          teilnahmeSection.classList.toggle(
            "hidden",
            !teilnahmeCheckbox.checked
          );
        });

       if (
          !begleitungCheckbox ||
          !begleiterSection ||
          !anzahlInput ||
          !container
        ) return;

       // Checkbox steuert Sichtbarkeit
        begleitungCheckbox.addEventListener("change", () => {
          const checked = begleitungCheckbox.checked;
      
          begleiterSection.classList.toggle("hidden", !checked);
      
          if (!checked) {
            container.innerHTML = "";
          } else {
            generateFields();
          }
        });
    
      // =========================
      // Checkbox „Begleitung“ steuert Anzeige
      // =========================
      begleitungCheckbox.addEventListener("change", function() {
        begleiterSection.style.display = this.checked ? "block" : "none";
        if (!this.checked) {
          container.innerHTML = "";
        } else {
          generateFields();
        }
      });

      // --- Anzeige der Mitbringen-Section steuern ---
       if (!mitbringenCheckbox || !mitbringenSection) return;
        mitbringenCheckbox.addEventListener("change", () => {
          mitbringenSection.classList.toggle(
            "hidden",
            !mitbringenCheckbox.checked
          );
        });
      
      // =========================
      // Dynamisch Begleitfelder erzeugen
      // =========================
      anzahlInput.addEventListener("input", generateFields);
      
      function generateFields() {
        container.innerHTML = "";
        const anzahl = parseInt(anzahlInput.value) || 0;
      
        for (let i = 1; i <= anzahl; i++) {
          container.innerHTML += `
            <div class="field">
              <label>Vorname von Person ${i}:
                <input type="text" name="begleiterVorname${i}">
              </label>
            </div>
            <div class="field">
              <label>Nachname von Person ${i}:
                <input type="text" name="begleiterNachname${i}">
              </label>
            </div>
            <div class="field">
              <label> Die Ernährungsform und/oder Unverträglichkeiten von Person ${i}:
                <input type="text" name="begleitergewohnheit${i}">
              </label>
            </div>
            <div class="field">
              <label>Das Alter von Person ${i}:</label><br>
                <label class="option">
                    <span class="option-text">
                       0–3 Jahre
                    </span>
                    <span class="option-control">
                      <input type="radio" name="begleiterAlter${i}" value="Baby">
                    </span>
                </label>
                <label class="option">
                    <span class="option-text">
                       4–12 Jahre
                    </span>
                    <span class="option-control">
                    <input type="radio" name="begleiterAlter${i}" value="Kind">
                    </span>
                </label>
                <label class="option">
                    <span class="option-text">
                       älter als 12
                    </span>
                    <span class="option-control">
                      <input type="radio" name="begleiterAlter${i}" value="Jugendlich"> 
                    </span>
                </label>
            </div>`
        }
      }
     
      
      
      // =========================
      // Formular absenden
      // =========================
      formPolterabend.addEventListener("submit", async (e) => {
        e.preventDefault();
        const vorname = document.getElementById("vornamePol")?.value || "";
        const nachname = document.getElementById("nachnamePol")?.value || "";
        const teilnahme = document.getElementById("teilnahmePol")?.checked ? "Ja" : "Nein"; // ✅ korrigiert
        const gewohnheit = document.getElementById("gewohnheitPol")?.value || "";
        const Begleitung = begleitungCheckbox.checked ? "Ja" : "Nein";
        const AnzahlBegleiter = anzahlInput.value || "";
        const Uebernachtung = document.querySelector('input[name="UebernachtungPol"]:checked')?.value || "";
        const Kommentar = document.getElementById("kommentarPol")?.value || "";
        // ✅ Neues Array "Begleiter" erzeugen
        const Begleiter = [];
        if (Begleitung === "Ja") {
          const anzahl = parseInt(AnzahlBegleiter) || 0;
      
          for (let i = 1; i <= anzahl; i++) {
            const vornameB = document.querySelector(`input[name="begleiterVorname${i}"]`)?.value || "";
            const nachnameB = document.querySelector(`input[name="begleiterNachname${i}"]`)?.value || "";
            const gewohnheitB = document.querySelector(`input[name="begleitergewohnheit${i}"]`)?.value || "";
            const alterB = document.querySelector(`input[name="begleiterAlter${i}"]:checked`)?.value || "";
      
            Begleiter.push({
              Vorname: vornameB,
              Nachname: nachnameB,
              Gewohnheit: gewohnheitB,
              Alter: alterB
            });
          }
        }
        // --- Buffet-Auswahl sammeln ---
        const Buffetmitbringen = [];
        document.querySelectorAll('input[name="Buffet"]:checked').forEach(cb => {
          Buffetmitbringen.push(cb.value);
        });
        const weitereGerichte = document.getElementById("Weiteres")?.value || "";

        let formDataCache = null;        
        try {
          await fetch(scriptURLPolterabend, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              vorname,
              nachname,
              teilnahme,
              gewohnheit,
              Begleitung,
              AnzahlBegleiter,
              Uebernachtung,
              Kommentar,
              Begleiter,
              Buffetmitbringen,
              weitereGerichte
            }),
          });

          formDataCache = {
            vorname,
            nachname,
            teilnahme,
            gewohnheit,
            Begleitung,
            AnzahlBegleiter,
            Uebernachtung,
            Kommentar,
            Begleiter,
            Buffetmitbringen,
            weitereGerichte
          };

          formPolterabend.classList.add("hidden");
          downloadViewPol.classList.remove("hidden");
          /*notification.classList.remove("hidden");
          setTimeout(() => {
              notification.classList.add("hidden");
              overlay.classList.add("hidden");
              formPolterabend.reset();
            }, 3000);*/
          } catch (error) {
            alert("Fehler beim Senden: " + error);
          }

        /* ===============================
            TXT aus Cache erzeugen
          =============================== */

        function createTxtContent(data) {
          let text = `
          Anmeldung Scherbenfrei-Feier
          
          Name: ${data.vorname} ${data.nachname}
          Teilnahme: ${data.teilnahme}
          Essgewohnheiten: ${data.gewohnheit}
          Begleitung: ${data.Begleitung}
          Anzahl Begleiter: ${data.AnzahlBegleiter}
          /*Übernachtung: ${data.Uebernachtung}*/
          
          Kommentar:
          ${data.Kommentar}
          
          Begleiter:
          `;
          
            data.Begleiter.forEach((b, i) => {
              text += `
          ${i + 1}. ${b.Vorname} ${b.Nachname}
             Alter: ${b.Alter}
             Ernährung: ${b.Gewohnheit}
          `;
            });
          
            text += `
          Buffet-Beiträge:
          ${data.Buffetmitbringen.join(", ") || "Keine"}
          
          Weitere Gerichte:
          ${data.weitereGerichte}
          `;
          
            return text;
          }
        /* ===============================
             📥 iOS-kompatibler Download (TXT)
          =============================== */

        document.getElementById("downloadPolBtn").addEventListener("click", () => {
          const textContent = createTxtContent(formDataCache);
        
          const blob = new Blob([textContent], {
            type: "text/plain;charset=utf-8"
          });
        
          const url = URL.createObjectURL(blob);
        
          // iOS SAFE
          const a = document.createElement("a");
          a.href = url;
          a.download = `Polterabend_${formDataCache.vorname}_${formDataCache.nachname}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        
          URL.revokeObjectURL(url);
        
          closePolterabendForm();
        });

        document.getElementById("closeDownloadPolBtn").addEventListener("click", () => {
          closePolterabendForm();
        });
       });
       });
      
    
    // =========================
    // Hochzeit
    // =========================

    function openHochzeitForm(){
        overlayHoch.classList.remove("hidden");
        popupHochzeit.classList.remove("hidden");
        formHochzeit.classList.remove("hidden");
        downloadViewHoch.classList.add("hidden");
        formHochzeit.reset();
        formDataCache=null;
    }
    function closeHochzeitForm(){
        overlayHoch.classList.add("hidden");
        popupHochzeit.classList.add("hidden");
        formHochzeit.classList.add("hidden");
        downloadViewHoch.classList.add("hidden");
        InformationenHoch.classList.add("hidden");
        BegleiterHoch.classList.add("hidden");
        Zimmer.classList.add("hidden");
        formHochzeit.reset();
        formDataCache=null;
    }
    
    const scriptURLHochzeit = "https://script.google.com/macros/s/AKfycbx-EOdnqZ8lk5ziLzxUoG3BCocAfHOi6fut7MpxTuTDtvaEZsr4NJ5rg9SUEQCkMpb9qg/exec";

    document.addEventListener("DOMContentLoaded", () => {
      const openHochzeitBtn = document.getElementById("openHochzeitBtn");
      const overlayHoch = document.getElementById("overlayHoch");
      const closeHochzeitBtn = document.getElementById("closeformHochBtn");
      const popupHochzeit = document.getElementById("popupHochzeit");
      const formHochzeit = document.getElementById("formHochzeit");
      const teilnahmeCheckboxHoch = document.getElementById("teilnahmeHoch");
      const teilnahmeSectionHoch = document.getElementById("InformationenHoch");
      const begleitungCheckboxHoch = document.getElementById("begleitungHoch");
      const begleiterSectionHoch = document.getElementById("BegleiterHoch");
      const zimmerCheckbox = document.querySelectorAll('input[name="UebernachtungHoch"]');
      const zimmerSection = document.getElementById("Zimmer");
      const anzahlInputHoch = document.getElementById("anzahlBegleiterHoch");
      const containerHoch = document.getElementById("begleiterFelderHoch");

      //Formular Hochzeit öffnen
      openHochzeitBtn.addEventListener("click", () => {
        openHochzeitForm();
      });

      //Formular Hochzeit schließen
      closeHochzeitBtn.addEventListener("click", () => {
        closeHochzeitForm()
      });
      // Schließen bei Klick auf Overlay
      overlayHoch.addEventListener("click", (e) => {
        if (e.target === overlayHoch) {
          closeHochzeitForm()
        }
      });
    
      // --- Anzeige der Teilnahme-Section steuern ---
      if (!teilnahmeCheckboxHoch || !teilnahmeSectionHoch) return;
        teilnahmeCheckboxHoch.addEventListener("change", () => {
          teilnahmeSectionHoch.classList.toggle(
            "hidden",
            !teilnahmeCheckboxHoch.checked
          );
        });
      
        if (
          !begleitungCheckboxHoch ||
          !begleiterSectionHoch ||
          !anzahlInputHoch ||
          !containerHoch
        ) return;
      
        // Checkbox steuert Sichtbarkeit
        begleitungCheckboxHoch.addEventListener("change", () => {
          const checked = begleitungCheckboxHoch.checked;
          begleiterSectionHoch.classList.toggle("hidden", !checked);
          if (!checked) {
            containerHoch.innerHTML = "";
          } else {
            generateFieldsHoch();
          }
        });

        // --- Anzeige der Zimmeranzahl steuern ---            
      if (!zimmerCheckbox.length && !zimmerSection) return;
        zimmerCheckbox.forEach(radio => {
          radio.addEventListener('change', () => {
            const selected = document.querySelector('input[name="UebernachtungHoch"]:checked');
            zimmerSection.classList.toggle('hidden', selected?.value !== "Location");
          });
        });

        // Dynamisch Begleitfelder erzeugen
        anzahlInputHoch.addEventListener("input", generateFieldsHoch);
      
        function generateFieldsHoch() {
          containerHoch.innerHTML = "";
          const anzahlHoch = parseInt(anzahlInputHoch.value) || 0;
          for (let i = 1; i <= anzahlHoch; i++) {
            containerHoch.innerHTML += `
              <div class="field">
                <label>Vorname von Person ${i}:
                  <input type="text" name="begleiterVornameHoch${i}">
                </label>
              </div>
              <div class="field">
                <label>Nachname von Person ${i}:
                  <input type="text" name="begleiterNachnameHoch${i}">
                </label>
              </div>
              <div class="field">
                <label>Die Ernährungsform und/oder Unverträglichkeiten von Person ${i}:
                  <input type="text" name="begleiterEssen${i}">
                </label>
              </div>
              <div class="field">
                <label>Das Alter von Person ${i}:</label><br>
                <label class="option">
                    <span class="option-text">
                       0–3 Jahre
                    </span>
                    <span class="option-control">
                    <input type="radio" name="begleiterAlterHoch${i}" value="Baby"> 
                    </span>
                </label>
                <label class="option">
                    <span class="option-text">
                       4–12 Jahre
                    </span>
                    <span class="option-control">
                    <input type="radio" name="begleiterAlterHoch${i}" value="Kind">
                    </span>
                </label>
                <label class="option">
                    <span class="option-text">
                       älter als 12
                    </span>
                    <span class="option-control">
                    <input type="radio" name="begleiterAlterHoch${i}" value="Jugendlich">
                    </span>
                </label>
              </div>`
          }
        }
           
    
    // Formular absenden
    formHochzeit.addEventListener("submit", async (e) => {
      e.preventDefault();
      const vorname = document.getElementById("vornameHoch")?.value || "";
      const nachname = document.getElementById("nachnameHoch")?.value || "";
      const teilnahme = document.getElementById("teilnahmeHoch")?.checked ? "Ja" : "Nein";
      const gewohnheit = document.getElementById("gewohnheitHoch")?.value || "";
      const Begleitung = begleitungCheckboxHoch.checked ? "Ja" : "Nein";
      const AnzahlBegleiter = anzahlInputHoch.value || "";
      const Uebernachtung = document.querySelector('input[name="UebernachtungHoch"]:checked')?.value || "";
      const Zimmer = document.getElementById("anzahlZimmer")?.value || "";
      const Kommentar = document.getElementById("kommentarHoch")?.value || "";
      // Neues Array "Begleiter" erzeugen
      const BegleiterHoch = [];
      if (Begleitung === "Ja") {
          const anzahlHoch = parseInt(AnzahlBegleiter) || 0;
      
          for (let i = 1; i <= anzahlHoch; i++) {
            const vornameC = document.querySelector(`input[name="begleiterVornameHoch${i}"]`)?.value || "";
            const nachnameC = document.querySelector(`input[name="begleiterNachnameHoch${i}"]`)?.value || "";
            const gewohnheitC = document.querySelector(`input[name="begleiterEssen${i}"]`)?.value || "";
            const alterC = document.querySelector(`input[name="begleiterAlterHoch${i}"]:checked`)?.value || "";
      
            BegleiterHoch.push({
              Vorname: vornameC,
              Nachname: nachnameC,
              Gewohnheit: gewohnheitC,
              Alter: alterC
            });
          }
        }

        

      try {
        await fetch(scriptURLHochzeit, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            vorname, 
            nachname, 
            teilnahme,
            gewohnheit,
            Begleitung,
            AnzahlBegleiter,
            Uebernachtung,
            Zimmer,
            Kommentar,
            BegleiterHoch }),
        });

        formDataCache = {
            vorname, 
            nachname, 
            teilnahme,
            gewohnheit,
            Begleitung,
            AnzahlBegleiter,
            Uebernachtung,
            Zimmer,
            Kommentar,
            BegleiterHoch
          };


        formHochzeit.classList.add("hidden");
        downloadViewHoch.classList.remove("hidden");
        /*notification.classList.remove("hidden");
        setTimeout(() => {
          notification.classList.add("hidden");
          overlayHoch.classList.add("hidden");
          formHochzeit.reset();
        }, 3000);*/
      } catch (error) {
        alert("Fehler beim Senden: " + error);
      }

      /* ===============================
            TXT aus Cache erzeugen
          =============================== */

        function createTxtContent(data) {
          let text = `
          Hochzeits-Anmeldung
          
          Name: ${data.vorname} ${data.nachname}
          Teilnahme: ${data.teilnahme}
          Essgewohnheiten: ${data.gewohnheit}
          Begleitung: ${data.Begleitung}
          Anzahl Begleiter: ${data.AnzahlBegleiter}
          Übernachtung: ${data.Uebernachtung}
          Zimmer: ${data.Zimmer}
          
          Kommentar:
          ${data.Kommentar}
          
          Begleiter:
          `;
          
            data.BegleiterHoch.forEach((b, i) => {
              text += `
          ${i + 1}. ${b.Vorname} ${b.Nachname}
             Alter: ${b.Alter}
             Ernährung: ${b.Gewohnheit}
          `;
            });
                    
            return text;
          }

      /* ===============================
             📥 iOS-kompatibler Download (TXT)
          =============================== */

        document.getElementById("downloadHochBtn").addEventListener("click", () => {
          const textContent = createTxtContent(formDataCache);
        
          const blob = new Blob([textContent], {
            type: "text/plain;charset=utf-8"
          });
        
          const url = URL.createObjectURL(blob);
        
          // iOS SAFE
          const a = document.createElement("a");
          a.href = url;
          a.download = `Hochzeit_${formDataCache.vorname}_${formDataCache.nachname}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        
          URL.revokeObjectURL(url);
        
          closeHochzeitForm()
        });

        document.getElementById("closeDownloadHochBtn").addEventListener("click", () => {
          closeHochzeitForm()
        });

      
    });
    
    });
