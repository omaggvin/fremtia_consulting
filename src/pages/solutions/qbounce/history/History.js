import ResultList from "../../../../components/ResultList";

export default function History() {
    const items = JSON.parse(localStorage.getItem("QBounceHistory")) || [];

    return (
        <>
            <div className="container ">
                <h1>Qbounce usage history</h1>
                <ResultList results={items} />
            </div>
        </>
    );
}
