import { Link } from "react-router-dom";

function GoToMainHeader() {
    return (
        <div className="p-2 mb-2">
          <Link to="/movies" className="telegram-text">&lt; К списку всех фильмов</Link>
        </div>
    )
}

export default GoToMainHeader;