
import("./style.css") 


const Contact = () => {



    return <div class="wrapper">
        <div class="title">
            <h1>contact us </h1>
            <div class="contact-form"></div>

            <div class="input-fields">

                <input type="text" class="input" placeholder="Name" />
                <input type="text" class="input" placeholder="Email Address" />
                <input type="text" class="input" placeholder="Phone" />
                <input type="text" class="input" placeholder="Subject" />

            </div>
            
            <div class="msg">
                <textarea placeholder="Message"></textarea>
                <div class="btn">send</div>
            </div>

        </div>
    </div>
}

export default Contact