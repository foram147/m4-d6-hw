//import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const AddComment = (props) => {
  /*tate = {
    comment: {
      comment: "",
      rate: 1,
      elementId: null,
    },
  };*/
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [elementID, setElementId] = useState("");

  useEffect(() => {
    setElementId(props.asin);
  }, [comment, rate]);

  /*componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        comment: {
          ...this.state.comment,
          elementId: this.props.asin,
        },
      });
    }
  }*/

  const sendComment = async (e) => {
    e.preventDefault();
    const comments = {
      comment,
      rate,
      elementID,
    };
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comments),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MzI5OTY2NjAsImV4cCI6MTYzNDIwNjI2MH0.vI8rqpM89GMD9kO9T6EiPc1QsRLj9alr0aq5ByB0Mgk",
          },
        }
      );
      if (response.ok) {
        // the comment has been sent succesfully!!
        alert("Comment was sent!");
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
