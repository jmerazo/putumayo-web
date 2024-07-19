<template>
    <footer class="footer">
        <div class="footer__contenido">
            <div class="footer__seccion footer__logo">
                <p>
                    <a href="https://www.gov.co/" target="_blank" rel="noopener noreferrer">
                        <img src="/img/logos/logo_govco.svg" alt="GOV"/>
                    </a>
                </p>
                <p>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        <img src="/img/logos/logo_colombiapv.png" alt="Colombia"/>
                    </a>
                </p>
                <p>
                    <a href="https://www.colombia.co/" target="_blank" rel="noopener noreferrer">
                        <img class="img__co" src="/img/logos/logo_co.svg" alt="CO"/>
                    </a>
                </p>
            </div>
            <div class="footer__seccion footer__info footer__seccion--divisor">
                <h3 class="footer__heading">Portal Único del Estado Colombiano</h3>
                <p class="footer__texto footer__texto--titulo">Dirección:</p>
                <p class="footer__texto">Calle 8 # 7 - 40 Barrio Centro</p>
                <p class="footer__texto footer__texto--titulo">Horarios de Atención:</p>
                <p class="footer__texto">Atención Presencial: Lunes Viernes de 8:00am a 12:00m - 2:00pm a 6pm </p>
                <!-- <p class="footer__texto">Atención Canales Virtuales: Lunes a Viernes de 8:30 am a 4:30 pm.</p> -->
                <p class="footer__texto footer__texto--titulo">Código Postal:</p>
                <p class="footer__texto">860001</p>
            </div>
            <div class="footer__seccion footer__contacto footer__seccion--divisor">
                <h3 class="footer__heading">Contacto</h3>
                <p class="footer__texto footer__texto--titulo">Teléfono:</p>
                <p class="footer__texto">Nacional: 01 8000 95 2525</p>
                <p class="footer__texto">Bogotá: +(57) 601 390 7950</p>
                <p class="footer__texto">Línea Anticorrupción: 01 8000 91 2667</p>
                <p class="footer__texto footer__texto--titulo">Correo Institucional:</p>
                <p class="footer__texto">contactenos@putumayo.gov.co</p>
                <p class="footer__texto"><a href="#">Solicita una llamada</a></p>
                <p class="footer__texto"><a href="#">Llamada web</a></p>
                <p class="footer__texto"><a href="#">Hablemos en línea</a></p>
            </div>
            <div class="footer__seccion footer__acerca footer__seccion--divisor">
                <h3 class="footer__heading">Acerca del sitio</h3>
                <p class="footer__texto"><a href="#">Mapa del sitio</a></p>
                <p class="footer__texto"><a href="#">Políticas de privacidad</a></p>
                <p class="footer__texto"><a href="#">Políticas de derechos de autor</a></p>
                <p class="footer__texto"><a href="#">Términos y condiciones</a></p>
                <h3 class="footer__heading">Ayudas de accesibilidad</h3>
                <p class="footer__texto"><a href="#">Centro de relevo</a></p>
                <h3 class="footer__heading">Síguenos en:</h3>
                <p class="footer__texto"><a href="#">Twitter</a></p>
                <p class="footer__texto"><a href="#">Facebook</a></p>
            </div>
        </div>
        <p class="copyright">todos los derechos reservados &copy;</p>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #0943b5;
    color: white;
    font-family: Arial, sans-serif;
    padding: 2rem 0;
    width: 100%;
}

.footer__contenido {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.footer__seccion {
    flex: 1;
    min-width: 200px;
    margin: 1rem;
}

.footer__logo img {
    max-width: 150px;
    margin-bottom: 1rem;
}

.img__co {
    width: 80px;
}

.footer__heading {
    font-size: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
}

.footer__texto {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.footer__texto--titulo {
    font-weight: bold;
}

.footer__seccion a {
    color: white;
    text-decoration: underline;
}

.footer__seccion a:hover {
    text-decoration: none;
}

.copyright {
    text-align: center;
    padding: 1rem 0;
    background-color: #083d9a;
    color: white;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-top: 2rem;
}

.footer__seccion--divisor {
    border-right: 1px solid white;
    padding-right: 1rem;
}

@media (max-width: 768px) {
    .footer__contenido {
        flex-direction: column;
        align-items: center;
    }

    .footer__seccion {
        min-width: unset;
        margin: 1rem 0;
    }

    .footer__seccion--divisor {
        border-right: none;
        border-bottom: 1px solid white;
    }
}
</style>