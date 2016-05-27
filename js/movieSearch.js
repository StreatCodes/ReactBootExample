var SearchBar = React.createClass({
    displayName: "SearchBar",

    render: function () {
        return React.createElement(
            "div",
            { "class": "col-lg-10 col-md-11 col-sm-12" },
            React.createElement(
                "form",
                null,
                React.createElement(
                    "fieldset",
                    { className: "form-group" },
                    React.createElement("input", { type: "search", className: "form-control", id: "moveSearch", placeholder: "Search for a movie, tv show or actor" })
                )
            ),
            React.createElement(SearchResults, null)
        );
    }
});

var SearchResults = React.createClass({
    displayName: "SearchResults",

    render: function () {
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(MovieCard, null),
            React.createElement(MovieCard, null),
            React.createElement(MovieCard, null)
        );
    }
});

var MovieCard = React.createClass({
    displayName: "MovieCard",

    render: function () {
        return React.createElement(
            "div",
            { className: "col-lg-4 col-md-6 col-sm-12" },
            React.createElement(
                "div",
                { className: "card" },
                React.createElement("img", { className: "card-img-top", "data-src": "...", alt: "Card image cap" }),
                React.createElement(
                    "div",
                    { className: "card-block" },
                    React.createElement(
                        "h4",
                        { className: "card-title" },
                        "Card title"
                    ),
                    React.createElement(
                        "p",
                        { className: "card-text" },
                        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
                    ),
                    React.createElement(
                        "p",
                        { className: "card-text" },
                        React.createElement(
                            "small",
                            { "class": "text-muted" },
                            "Last updated 3 mins ago"
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SearchBar, null), document.getElementById('movie-search'));
//# sourceMappingURL=C:\Users\mattr\websites\ReactBootExample\js\movieSearch.js.map