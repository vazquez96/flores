const openMessage =
    document.getElementById("openMessage");

const closeMessage =
    document.getElementById("closeMessage");

const messageOverlay =
    document.getElementById("messageOverlay");

const petalsContainer =
    document.getElementById("petals");

const bouquetContainer =
    document.querySelector(".bouquet-container");


/* =========================================================
   PÉTALOS
========================================================= */

function createPetal() {

    if (!petalsContainer) return;

    const petal =
        document.createElement("span");

    petal.className = "petal";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.setProperty(
        "--drift",
        (Math.random() * 180 - 90) + "px"
    );

    petal.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    const size =
        10 + Math.random() * 8;

    petal.style.width =
        size + "px";

    petal.style.height =
        size * 1.5 + "px";

    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    petalsContainer.appendChild(petal);

    setTimeout(
        () => petal.remove(),
        13000
    );
}


/* =========================================================
   PÉTALOS AMBIENTALES
========================================================= */

setInterval(
    createPetal,
    850
);


/* =========================================================
   PÉTALOS ESPECIALES
========================================================= */

function createMessagePetals() {

    for (let i = 0; i < 22; i++) {

        setTimeout(
            createPetal,
            i * 45
        );

    }
}


/* =========================================================
   ABRIR MENSAJE
========================================================= */

let openingMessage = false;

openMessage.addEventListener(
    "click",
    () => {

        if (openingMessage) return;

        openingMessage = true;


        /* -----------------------------------------
           REACCIÓN DEL RAMO
        ----------------------------------------- */

        if (bouquetContainer) {

            bouquetContainer.classList.remove(
                "message-opening"
            );

            void bouquetContainer.offsetWidth;

            bouquetContainer.classList.add(
                "message-opening"
            );

        }


        /* -----------------------------------------
           OCULTAR BOTÓN
        ----------------------------------------- */

        openMessage.classList.add(
            "message-hidden"
        );


        /* -----------------------------------------
           PREPARAR CARTA
        ----------------------------------------- */

        messageOverlay.classList.add(
            "opening"
        );

        messageOverlay.classList.remove(
            "active"
        );


        /* -----------------------------------------
           PETALOS + CARTA
        ----------------------------------------- */

        setTimeout(
            () => {

                createMessagePetals();

                messageOverlay.classList.remove(
                    "opening"
                );

                messageOverlay.classList.add(
                    "active"
                );

                if (bouquetContainer) {

                    bouquetContainer.classList.remove(
                        "message-opening"
                    );

                }

            },
            420
        );


        /* -----------------------------------------
           BLOQUEAR DOBLE CLIC
        ----------------------------------------- */

        setTimeout(
            () => {

                openingMessage = false;

            },
            1200
        );

    }
);


/* =========================================================
   CERRAR MENSAJE
========================================================= */

function closeMessageCard() {

    messageOverlay.classList.remove(
        "active"
    );

    messageOverlay.classList.remove(
        "opening"
    );


    /* -----------------------------------------
       MOSTRAR BOTÓN
    ----------------------------------------- */

    openMessage.classList.remove(
        "message-hidden"
    );

    openMessage.classList.add(
        "message-return"
    );

}


closeMessage.addEventListener(
    "click",
    closeMessageCard
);


/* =========================================================
   CERRAR HACIENDO CLICK FUERA
========================================================= */

messageOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            messageOverlay
        ) {

            closeMessageCard();

        }

    }
);


/* =========================================================
   CERRAR CON ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            messageOverlay.classList.contains("active")
        ) {

            closeMessageCard();

        }

    }
);