var SearchBar = React.createClass({
    getInitialState: function() {
        return {inputValue: '', searchValue: '', selectValue: 'All'};
    },
    handleChange: function(event) {
        this.setState({inputValue: event.target.value.substr(0, 140)});
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function(){ this.setState({searchValue: this.state.inputValue})}.bind(this), 300)
    },
    handleSelect: function(event) {
        if(this.state.selectValue !== event.target.innerHTML){
            this.setState({selectValue: event.target.innerHTML});
        }
    },
    searchTimeOut: setTimeout(function(){}),
    render: function() {
    return (
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
                <SearchResults searchValue={this.state.searchValue}/>
            </div>
        );
    }
});

var SearchResults = React.createClass({
    getInitialState: function() {
        return {searchResults: [], loading: false, searchQuery: "EMPTY"};
    },
    componentWillReceiveProps: function(nextProps) {
        //If search value changed send movie api request and set loading to true.
        if (nextProps.searchValue !== this.props.searchValue && nextProps.searchValue !== ""){
            this.setState({loading: true, searchQuery: nextProps.searchValue});

            var query = "http://api.themoviedb.org/3/search/multi?api_key=1fa14e6c92287ef10dc7a09da28b8f28&language=en&query=" + nextProps.searchValue;
            $.getJSON( query, function( data ) {
                console.log(data);
                this.setState({loading: false, searchResults: data});
            }.bind(this));
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        //only update if searchQuery or loading value has changed.
        return  nextState.searchQuery !== this.state.searchQuery ||
                nextState.loading !== this.state.loading;
    },
    componentWillUpdate: function(nextProps, nextState) {
    },
    render: function() {
        if(this.props.searchValue === ""){
            return (
                <div style={{textAlign: 'center', color: 'rgb(180, 180, 180)'}}>
                    <h3>Waiting for search input.</h3>
                </div>
            );
        }
        else if(this.state.loading){
            return (
                <div style={{textAlign: 'center', color: 'rgb(180, 180, 180)'}}>
                    <h3>Loading...</h3>
                </div>
            );
        }
        else {
            return (
                <div className="card-columns">
                    {this.state.searchResults.results.map(function(result) {
                        return <MovieCard key={result.id} data={result}/>;
                    })}
                </div>
            );
        }
    }
});

var MovieCard = React.createClass({
    render: function() {
        console.log(this.props.data);
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
