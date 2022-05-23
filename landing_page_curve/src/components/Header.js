import logo from "@logos/logo.svg";

const Header = () => {
  return `
    <nav class="navbar navbar-expand-lg navbar-light py-4 Header">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="${logo}" alt="logo" />
            </a>
            <button class="btn btn-outline-pink" type="submit">Try It Free</button>
        </div>
  </nav>
    `;
};

export { Header };
