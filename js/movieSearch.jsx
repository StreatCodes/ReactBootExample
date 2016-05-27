var SearchBar = React.createClass({
    getInitialState: function() {
        return {inputValue: '', searchValue: ''};
    },
    handleChange: function(event) {
        this.setState({inputValue: event.target.value.substr(0, 140)});
        clearTimeout(this.searchTimeOut);
        this.searchTimeOut = setTimeout(function(){ this.setState({searchValue: this.state.inputValue}); }.bind(this), 300)
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
        return {searchResults: [], loading: false};
    },
    componentWillReceiveProps: function(nextProps) {
        // this.setState({
        //     likesIncreasing: nextProps.likeCount > this.props.likeCount
        // });
        console.log(nextProps.searchValue);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.searchValue !== this.props.searchValue;
    },
    componentWillUpdate: function(newProps) {
        //console.log("Search for: " + newProps.searchValue);
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
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
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
                        <h4 className="card-title">Card title</h4>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        );
    }
});



ReactDOM.render(
    <SearchBar />, document.getElementById('movie-search')
);
