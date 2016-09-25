/** @jsx React.DOM */
var NavBarItem = React.createClass({
  generateLink: function(){
    return <NavBarLink url={this.props.url} text={this.props.text} />;
  },
  generateSubmenu: function(){
    return <NavBar items={this.props.submenu} />
  },
  generateContent: function(){
    var content = [this.generateLink()];
    if(this.props.submenu){
      content.push(this.generateSubmenu());
    }
    return content;
  },
  render: function() {
    var content = this.generateContent();
    return (
      <li>
        {content}
      </li>
    );
  }
})