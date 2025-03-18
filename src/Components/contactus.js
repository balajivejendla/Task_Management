import React from 'react'

function Contact() {
    return (
        <>
            <br/>
            <br/>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor:"#99bf9c"}}>
                            <strong>Email Support</strong>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>
                                Email: support@taskmanager.com<br/>
                                Response Time: Within 24 hours<br/>
                                Available 24/7 for your queries
                            </strong> 
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{backgroundColor:"#99bf9c"}}>
                            <strong>Phone Support</strong>
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>
                                Phone: +1 (555) 123-4567<br/>
                                Hours: Monday - Friday, 9 AM - 5 PM EST<br/>
                                Direct line for premium support
                            </strong> 
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={{backgroundColor:"#99bf9c"}}>
                            <strong>Office Location</strong>
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>
                                Address: 123 Task Street, Management City, TM 12345<br/>
                                Visit Hours: Monday - Friday, 10 AM - 4 PM<br/>
                                Please schedule appointments in advance
                            </strong> 
                        </div>
                    </div>
                </div>

                <br/><br/>
                <div className="mb-3">
                    <label htmlFor="contactForm" className="form-label">Send us a Message:</label>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Your Name"
                            style={{
                                backgroundColor:"#FAF3DD",
                                border:"2px solid #D4A373",
                                marginBottom: "10px"
                            }}
                        />
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Your Email"
                            style={{
                                backgroundColor:"#FAF3DD",
                                border:"2px solid #D4A373",
                                marginBottom: "10px"
                            }}
                        />
                        <textarea 
                            className="form-control" 
                            id="contactForm" 
                            style={{
                                borderBlock:"5px solid black",
                                backgroundColor:"#FAF3DD",
                                border:"2px solid #D4A373"
                            }}
                            rows="3"
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <br/>
                    <button 
                        type="button" 
                        className="btn btn-success"
                        style={{
                            backgroundColor:"#77BFA3",
                            border: "none"
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </>
    );
}

export default Contact;