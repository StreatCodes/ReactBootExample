var SearchBar = React.createClass({
    getInitialState: function() {
        return {inputValue: '', searchValue: '', selectValue: 'multi'};
    },
    handleChange: function(event) {
        //Cut user input to max length of 140 characters.
        //Don't send API request until the user has stopped typing for 300ms
        //This way we don't spam their servers every keystroke.
        this.setState({inputValue: event.target.value.substr(0, 140)});
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function(){
            //only set the state if the input has changed and isn't empty.
            if(this.state.inputValue !== this.state.searchValue && this.state.inputValue !== ""){
                this.setState({searchValue: this.state.inputValue})
            }
        }.bind(this), 300)
    },
    handleSelect: function(event) {
        //Handles search bar dropdown menu.
        if(this.state.selectValue !== event.target.innerHTML){
            var type;

            //Set prop to appropriate string for the search query later.
            switch(event.target.innerHTML){
                case 'All':
                    type = "multi"
                    break;
                case 'Movie':
                    type = "movie"
                    break;
                case 'TV Show':
                    type = "tv"
                    break;
                case 'Actors':
                    type = "person"
                    break;
                default:
                    type = "multi"
                    console.log('Error this should never happen :(');
            }
            this.setState({selectValue: type});
        }
    },
    searchTimeOut: setTimeout(function(){}),
    render: function() {
    return (
        //Renders search box.
        <div className="col-lg-10 col-md-11 col-sm-12">
            <div className="input-group" style={{marginBottom: '20px'}}>
                <input type="search"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    className="form-control" placeholder="Search for a movie, tv show or actor" />
                <div className="input-group-btn">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selectValue}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" onClick={this.handleSelect}>All</a>
                        <a className="dropdown-item" onClick={this.handleSelect}>Movie</a>
                        <a className="dropdown-item" onClick={this.handleSelect}>TV Show</a>
                        <a className="dropdown-item" onClick={this.handleSelect}>Actors</a>
                    </div>
                </div>
            </div>
            <SearchResults searchValue={this.state.searchValue} selectValue={this.state.selectValue}/>
        </div>
        );
    }
});

var SearchResults = React.createClass({
    getInitialState: function() {
        return {searchResults: [], loading: false, searchQuery: "EMPTY", selectValue: "EMPTY", totalPages: 0, currentPage: 1};
    },
    handlePageSelect: function(page, event){
        //Handle pagination clicks and sets page to new one
        if(page !== this.state.currentPage){
            this.setState({currentPage: page, loading: true});
            console.log('PAGE SELECTION NUMBER: ' + page);
        }
    },
    apiQuery: function(nextState){
        //Setup url for search
        var baseURL = "http://api.themoviedb.org/3/search/";
        var type = nextState.selectValue;
        var options = "?api_key=1fa14e6c92287ef10dc7a09da28b8f28&language=en&query=";
        var page = "&page=" + nextState.currentPage;

        var query = baseURL + type + options + nextState.searchQuery + page;
        console.log('search query: ' + query)
        //Submit search query to The Movie Database servers
        $.getJSON(query , function( data ) {
            this.setState({loading: false, searchResults: data, totalPages: data.total_pages,  currentPage: data.page});
        }.bind(this));
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.props.searchValue !== nextProps.searchValue ||
            this.props.selectValue !== nextProps.selectValue){
            //If search value changed send movie api request and set loading to true.
            this.setState({loading: true, selectValue: nextProps.selectValue, searchQuery: nextProps.searchValue, currentPage: 1});
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        //only update if searchQuery or loading value has changed.
        return  nextState.searchQuery !== this.state.searchQuery ||
                nextState.selectValue !== this.state.selectValue ||
                nextState.loading !== this.state.loading ||
                nextState.currentPage !== this.state.currentPage;
    },
    componentWillUpdate: function(nextProps, nextState) {
        //We only ever set loading when we are going to send a new API request
        if(this.state.loading !== nextState.loading){
            this.apiQuery(nextState);
        }
    },
    render: function() {
        //Search bar is empty
        if(this.props.searchValue === ""){
            return (
                <div style={{textAlign: 'center', color: 'rgb(180, 180, 180)'}}>
                    <h3>Waiting for search input.</h3>
                </div>
            );
        }
        //Fetching results, display loading
        else if(this.state.loading){
            return (
                <div style={{textAlign: 'center', color: 'rgb(180, 180, 180)'}}>
                    <h3>Loading...</h3>
                </div>
            );
        }
        else {
            //Display search results
            if (this.state.searchResults.results.length > 0){
                return (
                    <div>
                        <div className="card-columns">
                            {this.state.searchResults.results.map(function(result) {
                                return <MovieCard key={result.id} data={result}/>;
                            })}

                        </div>
                        <div style={{textAlign: 'center'}}>
                            <Pageination currentPage={this.state.currentPage} totalPages={this.state.totalPages} handleClick={this.handlePageSelect}/>
                        </div>
                    </div>
                );
            } else {
            //No results
                return (
                    <div style={{textAlign: 'center', color: 'rgb(180, 180, 180)'}}>
                        <h3>No results :(</h3>
                        <p>Try a different search term or type</p>
                    </div>
                );
            }
        }
    }
});

//Gives ability to go through pages
var Pageination = React.createClass({
    render: function() {
        //Setup pagination based on the currently view page.
        //There is no easy way to do this without this fugly code.
        var pages = [];
        var start = this.props.currentPage <= 3 ? 1 : this.props.currentPage - 3;
        var end = this.props.currentPage + 3 > this.props.totalPages ? this.props.totalPages : this.props.currentPage + 3;
        for (var i = start; i <= end; i++) {
          pages.push(<li onClick={this.props.handleClick.bind(null, i)} key={i} className={i === this.props.currentPage ? "page-item active" : "page-item"}><a className="page-link" href={i !== this.props.currentPage ? '#' : null}>{i}</a></li>);
        }
        return (
            <nav>
                <ul className="pagination">
                    {this.props.currentPage !== 1 ?
                        <li className="page-item">
                            <a className="page-link" id="back" onClick={this.props.handleClick.bind(null, this.props.currentPage - 1)} href='#' aria-label="Previous">
                                <span>&laquo;</span>
                            </a>
                        </li> : null
                    }
                    {pages}
                    {this.props.currentPage !== this.props.totalPages ?
                        <li className="page-item">
                            <a className="page-link" id="forward" onClick={this.props.handleClick.bind(null, this.props.currentPage + 1)} href='#' aria-label="Next">
                                <span>&raquo;</span>
                            </a>
                        </li> : null
                    }

                </ul>
            </nav>
        );
    }
});

//straight forward class for displaying movies on bootstrap's cards
var MovieCard = React.createClass({
    render: function() {
        return (
            <div className="card">
                <img className="card-img-top" style={{width: '100%'}} src={this.props.data.backdrop_path ? "https://image.tmdb.org/t/p/w300/" + this.props.data.backdrop_path : 'images/NoImage.png'} alt="Card image cap" />
                <div className="card-block">
                    <h4 className="card-title">{this.props.data.name || this.props.data.title}</h4>
                    <p className="card-text">{this.props.data.overview ? this.props.data.overview.substr(0, 120) + '...' : null}</p>
                    <p className="card-text"><small class="text-muted">{this.props.data.first_air_date}</small></p>
                </div>
            </div>
        );
    }
});


ReactDOM.render(
    <SearchBar />, document.getElementById('movie-search')
);
