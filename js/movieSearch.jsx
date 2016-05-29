var SearchBar = React.createClass({
    getInitialState: function() {
        return {inputValue: '', searchValue: ''};
    },
    handleChange: function(event) {
        this.setState({inputValue: event.target.value.substr(0, 140)});
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function(){ this.setState({searchValue: this.state.inputValue})}.bind(this), 300)
    },
    searchTimeOut: setTimeout(function(){}),
    render: function() {
    return (
        <div className="col-lg-10 col-md-11 col-sm-12">
            <fieldset className="form-group">
                <input
                    type="search"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    className="form-control" placeholder="Search for a movie, tv show or actor" />
            </fieldset>
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
        if (nextProps.searchValue !== this.props.searchValue && nextProps.searchValue !== ""){
            this.setState({loading: true, searchQuery: nextProps.searchValue});
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.searchQuery !== this.state.searchQuery;
    },
    componentWillUpdate: function(nextProps, nextState) {
        //AJAX REQUEST HERE.
        console.log("Search for: " + nextState.searchQuery);

        var query = "http://api.themoviedb.org/3/search/multi?api_key=1fa14e6c92287ef10dc7a09da28b8f28&query=" + nextState.searchQuery;
            $.getJSON( query, function( data ) {
                console.log(data);
                this.setState({loading: false, searchResults: data});
            }.bind(this));

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
            <div className="row">
                <MovieCard name="Game of Thrones" rating="8.9" backDrop="" overView="Greate tv" type="TV" date="2011"/>
            </div>
            );
        }
    }
});

var MovieCard = React.createClass({
    render: function() {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top" data-src="..." alt="Card image cap" />
                    <div className="card-block">
                        <h4 className="card-title">{this.props.name}</h4>
                        <p className="card-text">{this.props.overView}</p>
                        <p className="card-text"><small class="text-muted">{this.props.date}</small></p>
                    </div>
                </div>
            </div>
        );
    }
});



ReactDOM.render(
    <SearchBar />, document.getElementById('movie-search')
);
