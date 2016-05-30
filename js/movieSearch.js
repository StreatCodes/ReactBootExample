var SearchBar = React.createClass({
    displayName: 'SearchBar',

    getInitialState: function () {
        return { inputValue: '', searchValue: '' };
    },
    handleChange: function (event) {
        this.setState({ inputValue: event.target.value.substr(0, 140) });
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function () {
            this.setState({ searchValue: this.state.inputValue });
        }.bind(this), 300);
    },
    searchTimeOut: setTimeout(function () {}),
    render: function () {
        return React.createElement(
            'div',
            { className: 'col-lg-10 col-md-11 col-sm-12' },
            React.createElement(
                'div',
                { className: 'input-group', style: { marginBottom: '20px' } },
                React.createElement('input', { type: 'search',
                    value: this.state.inputValue,
                    onChange: this.handleChange,
                    className: 'form-control', placeholder: 'Search for a movie, tv show or actor' }),
                React.createElement(
                    'div',
                    { className: 'input-group-btn' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-secondary dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        'Anything'
                    ),
                    React.createElement(
                        'div',
                        { className: 'dropdown-menu dropdown-menu-right' },
                        React.createElement(
                            'a',
                            { className: 'dropdown-item', href: '#' },
                            'Anything'
                        ),
                        React.createElement(
                            'a',
                            { className: 'dropdown-item', href: '#' },
                            'Movie'
                        ),
                        React.createElement(
                            'a',
                            { className: 'dropdown-item', href: '#' },
                            'TV Show'
                        ),
                        React.createElement(
                            'a',
                            { className: 'dropdown-item', href: '#' },
                            'Actors'
                        )
                    )
                )
            ),
            React.createElement(SearchResults, { searchValue: this.state.searchValue })
        )

        /*<div className="col-lg-10 col-md-11 col-sm-12">
            <fieldset className="form-group">
                <input
                    type="search"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    className="form-control" placeholder="Search for a movie, tv show or actor" />
            </fieldset>
            <SearchResults searchValue={this.state.searchValue}/>
        </div>*/
        ;
    }
});

var SearchResults = React.createClass({
    displayName: 'SearchResults',

    getInitialState: function () {
        return { searchResults: [], loading: false, searchQuery: "EMPTY" };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.searchValue !== this.props.searchValue && nextProps.searchValue !== "") {
            this.setState({ loading: true, searchQuery: nextProps.searchValue });
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return nextState.searchQuery !== this.state.searchQuery;
    },
    componentWillUpdate: function (nextProps, nextState) {
        //AJAX REQUEST HERE.
        console.log("Search for: " + nextState.searchQuery);

        var query = "http://api.themoviedb.org/3/search/multi?api_key=1fa14e6c92287ef10dc7a09da28b8f28&query=" + nextState.searchQuery;
        $.getJSON(query, function (data) {
            console.log(data);
            this.setState({ loading: false, searchResults: data });
        }.bind(this));
    },
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
        } else if (this.state.loading) {
            return React.createElement(
                'div',
                { style: { textAlign: 'center', color: 'rgb(180, 180, 180)' } },
                React.createElement(
                    'h3',
                    null,
                    'Loading...'
                )
            );
        } else {
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(MovieCard, { name: 'Game of Thrones', rating: '8.9', backDrop: '', overView: 'Greate tv', type: 'TV', date: '2011' })
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
                        this.props.name
                    ),
                    React.createElement(
                        'p',
                        { className: 'card-text' },
                        this.props.overView
                    ),
                    React.createElement(
                        'p',
                        { className: 'card-text' },
                        React.createElement(
                            'small',
                            { 'class': 'text-muted' },
                            this.props.date
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SearchBar, null), document.getElementById('movie-search'));
//# sourceMappingURL=C:\Users\mattr\websites\ReactBootExample\js\movieSearch.js.map