export function meta() {
    return [
        { title: "Contacto - Pastelería Mil Sabores" },
    ];
}

export default function Contacto() {
    return (
        <section id="contacto" className="section active">
            <div className="container">
                <h2 className="section-title">Contáctanos</h2>

                <div className="contact-container">
                    <div className="contact-form">
                        <h3>Envíanos un Mensaje</h3>
                        <form id="contact-form">
                            <div className="form-group">
                                <label htmlFor="contact-nombre">Nombre</label>
                                <input type="text" id="contact-nombre" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-email">Email</label>
                                <input type="email" id="contact-email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-mensaje">Mensaje</label>
                                <textarea id="contact-mensaje" rows={5} required></textarea>
                            </div>

                            <button type="button" className="btn-primary full-width">
                                <i className="fas fa-paper-plane"></i> Enviar Mensaje
                            </button>
                        </form>
                    </div>

                    <div className="contact-info">
                        <h3>Información de Contacto</h3>

                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Dirección</strong>
                                Av. Providencia 1234, Santiago, Chile
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <strong>Teléfono</strong>
                                +56 2 2345 6789
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <strong>Email</strong>
                                contacto@milsabores.cl
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="fas fa-clock"></i>
                            <div>
                                <strong>Horarios</strong>
                                Lun - Vie: 8:00 - 20:00<br />
                                Sáb - Dom: 9:00 - 18:00
                            </div>
                        </div>

                        <div className="faq">
                            <h4>Preguntas Frecuentes</h4>

                            <div className="faq-item">
                                <strong>¿Hacen entregas a domicilio?</strong>
                                Sí, realizamos entregas en toda la Región Metropolitana.
                            </div>

                            <div className="faq-item">
                                <strong>¿Con cuánta anticipación debo hacer mi pedido?</strong>
                                Para tortas especiales, recomendamos 48 horas de anticipación.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}