var SearchBar = React.createClass({
    displayName: 'SearchBar',

    getInitialState: function () {
        return { inputValue: '', searchValue: '', selectValue: 'All' };
    },
    handleChange: function (event) {
        //Cut user input to max length of 140 characters.
        //Don't send API request until the user has stopped typing for 300ms
        //This way we don't spam their servers every keystroke.
        this.setState({ inputValue: event.target.value.substr(0, 140) });
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function () {
            this.setState({ searchValue: this.state.inputValue });
        }.bind(this), 300);
    },
    handleSelect: function (event) {
        //Handles search bar dropdown menu.
        if (this.state.selectValue !== event.target.innerHTML) {
            this.setState({ selectValue: event.target.innerHTML });
        }
    },
    searchTimeOut: setTimeout(function () {}),
    render: function () {
        return(
            //Renders search box.
            React.createElement(
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
                            this.state.selectValue
                        ),
                        React.createElement(
                            'div',
                            { className: 'dropdown-menu dropdown-menu-right' },
                            React.createElement(
                                'a',
                                { className: 'dropdown-item', onClick: this.handleSelect },
                                'All'
                            ),
                            React.createElement(
                                'a',
                                { className: 'dropdown-item', onClick: this.handleSelect },
                                'Movie'
                            ),
                            React.createElement(
                                'a',
                                { className: 'dropdown-item', onClick: this.handleSelect },
                                'TV Show'
                            ),
                            React.createElement(
                                'a',
                                { className: 'dropdown-item', onClick: this.handleSelect },
                                'Actors'
                            )
                        )
                    )
                ),
                React.createElement(SearchResults, { searchValue: this.state.searchValue, selectValue: this.state.selectValue })
            )
        );
    }
});

var SearchResults = React.createClass({
    displayName: 'SearchResults',

    getInitialState: function () {
        return { searchResults: [], loading: false, searchQuery: "EMPTY" };
    },
    componentWillReceiveProps: function (nextProps) {
        //If search value changed send movie api request and set loading to true.
        if (nextProps.searchValue !== "" && (nextProps.searchValue !== this.props.searchValue || this.props.selectValue !== nextProps.selectValue)) {
            this.setState({ loading: true, searchQuery: nextProps.searchValue });

            //Setup url for search
            var baseURL = "http://api.themoviedb.org/3/search/";
            var type = "";
            var options = "?api_key=1fa14e6c92287ef10dc7a09da28b8f28&language=en&query=";

            switch (nextProps.selectValue) {
                case 'All':
                    type = "multi";
                    break;
                case 'Movie':
                    type = "movie";
                    break;
                case 'TV Show':
                    type = "tv";
                    break;
                case 'Actors':
                    type = "person";
                    break;
                default:
                    type = "multi";
                    console.log('Error this should never happen :(');
            }

            var query = baseURL + type + options + nextProps.searchValue;

            console.log('Searching: ' + query);
            //Submit search query to The Movie Database servers
            $.getJSON(query, function (data) {
                this.setState({ loading: false, searchResults: data });
            }.bind(this));
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        //only update if searchQuery or loading value has changed.
        return nextState.searchQuery !== this.state.searchQuery || nextState.loading !== this.state.loading;
    },
    componentWillUpdate: function (nextProps, nextState) {},
    render: function () {
        //Search bar is empty
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
        }
        //Fetching results, display loading
        else if (this.state.loading) {
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
                //Display search results
                if (this.state.searchResults.results.length > 0) {
                    return React.createElement(
                        'div',
                        { className: 'card-columns' },
                        this.state.searchResults.results.map(function (result) {
                            return React.createElement(MovieCard, { key: result.id, data: result });
                        })
                    );
                } else {
                    //No results
                    return React.createElement(
                        'div',
                        { style: { textAlign: 'center', color: 'rgb(180, 180, 180)' } },
                        React.createElement(
                            'h3',
                            null,
                            'No results :('
                        ),
                        React.createElement(
                            'p',
                            null,
                            'Try a different search term or type'
                        )
                    );
                }
            }
    }
});

//straight forward class for displaying movies on bootstrap's cards
var MovieCard = React.createClass({
    displayName: 'MovieCard',

    render: function () {
        return React.createElement(
            'div',
            { className: 'card' },
            React.createElement('img', { className: 'card-img-top', style: { width: '100%' }, src: this.props.data.backdrop_path ? "https://image.tmdb.org/t/p/w300/" + this.props.data.backdrop_path : 'images/NoImage.png', alt: 'Card image cap' }),
            React.createElement(
                'div',
                { className: 'card-block' },
                React.createElement(
                    'h4',
                    { className: 'card-title' },
                    this.props.data.name || this.props.data.title
                ),
                React.createElement(
                    'p',
                    { className: 'card-text' },
                    this.props.data.overview ? this.props.data.overview.substr(0, 120) + '...' : null
                ),
                React.createElement(
                    'p',
                    { className: 'card-text' },
                    React.createElement(
                        'small',
                        { 'class': 'text-muted' },
                        this.props.data.first_air_date
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(SearchBar, null), document.getElementById('movie-search'));
//# sourceMappingURL=C:\Users\mattr\websites\ReactBootExample\js\movieSearch.js.map