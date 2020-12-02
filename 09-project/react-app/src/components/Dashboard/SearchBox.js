import axios from "axios";

const SearchBox = ({ UserAuthorzationBearerToken }) => {


  const handleSubmit = (e) => {
    e.preventDefault();
    const Disabled = this.state.Disabled;
    if (Disabled) {
      return;
    }
    if (this.state.PaswordsMatch === false) {
      this.setState({
        error: "Passwords do not match",
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        error: "Password must be at least 6 characters long.",
      });
    } else {
      this.setState(
        {
          error: "",
          Disabled: true,
        },
        function () {
          axios({
            method: "post",
            url: "/api/getLocationByIP",
            data: {
              FirstName: this.state.FirstName,
              LastName: this.state.LastName,
              Email: this.state.Email,
              Password: this.state.Password,
              ConfirmPassword: this.state.ConfirmPassword,
            },
            headers: {
              "Content-Type": "application/json",
              "Authorization": ""
            },
          })
            .then((res) => {
              this.setState(
                {
                  error: "",
                },
                () => {
                  this.props.SignUpAction(res.data);
                }
              );
            })
            .catch((err) => {
              this.setState({
                error: err.response.data.error,
                Disabled: false,
              });
            });
        }
      );
    }
  };


  return (
    <div>
      <form className='form-inline justify-content-center'  onSubmit={handleSubmit}>
        {UserAuthorzationBearerToken}

        <input
          type='text'
          className='form-control mb-2 mr-sm-2'
          id='IPAddress'
          name='IPAddress'
          placeholder='e.g. 141.117.126.20'
        />
        <button type='submit' className='btn btn-primary mb-2'>
          Reverse Look Up Location
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
