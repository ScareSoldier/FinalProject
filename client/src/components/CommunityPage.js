import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

class CommunityPage extends React.Component {
  render() {
    return (
      <Wrapper>
        <div>
          <CommentBox />
        </div>
      </Wrapper>
    );
  }
}

class Comment extends React.Component {
  _getUpperCase(name) {
    return name.toUpperCase();
  }
  render() {
    return (
      <div>
        <blockquote>
          <Name style={{ fontFamily: "cursive", marginBottom: "10px" }}>
            {" "}
            -@{this.props.author}
          </Name>
          <StyledFooter style={{ marginBottom: "10px" }}>
            {this.props.body}
          </StyledFooter>
        </blockquote>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <Label>Join The Discussion</Label>
        <div>
          <StyledInput
            placeholder="Name:"
            ref={(input) => (this._author = input)}
          />{" "}
          <br />
          <StyledTextarea
            placeholder="Comment:"
            ref={(textarea) => (this._body = textarea)}
          />
        </div>
        <div>
          <StyledButton type="submit">Post Comment</StyledButton>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        {
          id: 1,
          author: "Joss",
          body: "What is a good combo with eggs?",
        },
        {
          id: 2,
          author: "Susan",
          body: "I recommend Bacon it's tasty with eggs!",
        },
      ],
    };
  }
  // Get Comments
  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }

  _getCommentTitle(commentCount) {
    if (commentCount === 0) {
      return "No Comments yet";
    } else if (commentCount === 1) {
      return "1 Comment";
    } else {
      return `Comments: (${commentCount}) `;
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show comments";

    if (this.state.showComments) {
      buttonText = "Hide comments";
    }
    if (this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>;
    }
    return (
      <div className="comment-box container">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h1>
          &nbsp;
          <small className="text-muted">
            {this._getCommentTitle(comments.length)}
          </small>
        </h1>
        <hr />
        <StyledButton onClick={this._handleClick.bind(this)}>
          {buttonText}
        </StyledButton>
        {commentNodes}
      </div>
    );
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body,
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }
}

const Wrapper = styled.h1`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  width: 100vw;
  margin: 32px auto;
  offset: 32px;
  max-width: 400px;
  padding: 24px;
  background-image: radial-gradient(
    circle 343px at 46.3% 47.5%,
    rgba(242, 242, 242, 1) 0%,
    rgba(241, 241, 241, 1) 72.9%
  );

  border-radius: 16px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;

const Label = styled.h1`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: black;
  text-align: center;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
`;

const StyledButton = styled.button`
  color: white;
  display: inline-block;
  padding: 0.5em 1.7em;
  /* margin: 0 0.1em 0.1em 0; */
  margin-top: 10px;
  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(87, 108, 117, 1) 0%,
    rgba(37, 50, 55, 1) 100.2%
  );
  text-shadow: 0 0.04em 0.04em rgba(255, 255, 255, 0.253);
  text-align: center;
  transition: all 0.2s;
  &:hover {
    color: black;
    background-image: linear-gradient(
      111.4deg,
      rgba(241, 203, 39, 1) -0.4%,
      rgba(241, 137, 25, 1) 100.2%
    );
  }
`;

const StyledInput = styled.input`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1.2rem;
  margin: 0 auto;
  margin-top: 10px;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
`;

const StyledTextarea = styled.textarea`
  font-family: "Roboto", sans-serif;
  margin-top: 10px;
  color: #333;
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
`;

const StyledFooter = styled.footer`
  color: olivedrab;
  font-family: "Roboto", sans-serif;
  margin-top: 10px;
  color: #333;
  font-size: 14px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
`;

const Name = styled.h3`
  text-align: left;
`;

export default CommunityPage;
