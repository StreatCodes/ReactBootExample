var SearchBar = React.createClass({
  render: function() {
    return (
        <div class="col-lg-10 col-md-11 col-sm-12">
            <form>
                <fieldset className="form-group">
                    <input type="search" className="form-control" id="moveSearch" placeholder="Search for a movie, tv show or actor" />
                </fieldset>
            </form>
            <SearchResults />
        </div>
        );
    }
});

var SearchResults = React.createClass({
  render: function() {
    return (
        <div className="row">
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </div>
        );
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
