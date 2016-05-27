var SearchBar = React.createClass({
    displayName: 'SearchBar',

    getInitialState: function () {
        return { inputValue: '', searchValue: '' };
    },
    handleChange: function (event) {
        this.setState({ inputValue: event.target.value.substr(0, 140) });
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function () {
            this.setState({ searchValue: this.state.inputValue });console.log(this.state.searchValue);
        }.bind(this), 300);
    },
    searchTimeOut: setTimeout(function () {}),
    render: function () {
        return React.createElement(
            'div',
            { className: 'col-lg-10 col-md-11 col-sm-12' },
            React.createElement(
                'form',
                null,
                React.createElement(
                    'fieldset',
                    { className: 'form-group' },
                    React.createElement('input', {
                        type: 'search',
                        value: this.state.inputValue,
                        onChange: this.handleChange,
                        className: 'form-control', placeholder: 'Search for a movie, tv show or actor' })
                )
            ),
            React.createElement(SearchResults, { searchValue: this.state.searchValue })
        );
    }
});

var SearchResults = React.createClass({
    displayName: 'SearchResults',

    render: function () {
        if (this.props.searchValue === "") {
            return React.createElement(
                'div',
                { style: { textAlign: 'center', color: 'rgb(180, 180, 180)' } },
                React.createElement(
                    'h3',
                    null,
                    'Waiting for search input.'
                )
            );
        } else {
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(MovieCard, null),
                React.createElement(MovieCard, null),
                React.createElement(MovieCard, null),
                React.createElement(MovieCard, null)
            );
        }
    }
});

var MovieCard = React.createClass({
    displayName: 'MovieCard',

    render: function () {
        return React.createElement(
            'div',
            { className: 'col-lg-4 col-md-6 col-sm-12' },
            React.createElement(
                'div',
                { className: 'card' },
                React.createElement('img', { className: 'card-img-top', 'data-src': '...', alt: 'Card image cap' }),
                React.createElement(
                    'div',
                    { className: 'card-block' },
                    React.createElement(
                        'h4',
                        { className: 'card-title' },
                        'Card title'
                    ),
                    React.createElement(
                        'p',
                        { className: 'card-text' },
                        'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
                    ),
                    React.createElement(
                        'p',
                        { className: 'card-text' },
                        React.createElement(
                            'small',
                            { 'class': 'text-muted' },
                            'Last updated 3 mins ago'
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SearchBar, null), document.getElementById('movie-search'));
//# sourceMappingURL=C:\Users\mattr\websites\ReactBootExample\js\movieSearch.js.map