
export default function Info() {
    return (
        <>
        <div className="container" style={{ padding: "20px" }}>
            <h1>QBounce</h1>
            <p>
            QBounce is a tool that helps you calculate the height of a balls peak. 
            We uses an novel and advanced training algorithm, called the fortuna algorithm, 
            to train a model that can predict the height of a ball. It is trained on localy sourced data,
            and is therefore very accurate.
            </p>

            <iframe 
                src="https://docs.google.com/presentation/d/e/2PACX-1vSQSTIH0Kj44Mm43ZR7zA0FHTzhz9YoKfbKuegJj8U8Dj7Hon-fjmRSp6QDNfokYA91IEXV_8wXFJRP/embed?start=true&loop=false&delayms=60000" 
                frameborder="0"
                width="960"
                height="569"
                allowfullscreen="true"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                title="QBounce Presentation"
                >

                </iframe>
        </div>
        </>
    );
}
