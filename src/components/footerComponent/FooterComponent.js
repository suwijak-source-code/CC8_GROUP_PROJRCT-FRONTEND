import "./FooterComponent.css"



const FooterComponent = () => {
    return (
        <>
            <footer className="footer-component">
                <p>
                    &copy; 2021 Company, Inc. &middot;
                <a className="footer-link" href="#">Privacy</a> &middot;
                <a className="footer-link" href="#">Terms</a>
                </p>
                <p><a className="footer-link" href="#">Back to top</a></p>
            </footer>
        </>
    )
}

export default FooterComponent;