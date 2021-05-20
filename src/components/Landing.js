import React, { Fragment, Component} from 'react';

export default class Landing extends Component {
  componentDidMount = () => {
    console.log('enter landing');
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <section className="hero is-tmobile">
          <div className="hero-body">
            <p className="title">
              Hero title (Banner)
            </p>
            <p class="subtitle">
              Hero subtitle (Baneer information)
            </p>
          </div>
        </section>
        {/* introduction with 3 cards */}
        <section className="section">
          <div className="tile is-ancestor ">
            <div className="tile is-parent">
              <div className="tile is-child box">
                {/* <div className="card"> */}
                  <div className="card-image">
                    <figure className="image is-2by1" >
                      <img src="img/SMS.jpg" alt="placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div>
                      <p>Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.</p>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
            <div className="tile is-4 is-parent">
              <div className="tile  is-child box">
                {/* <div className="card"> */}
                  <div className="card-image">
                    <figure className="image is-1by1" >
                      <img src="img/button.png" alt="placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div>
                      <p>Lorem ipsum leo risus, porta ac consemetus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.</p>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
   
            {/* <div className="tile">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3" >
                    <img src="img/placeholder_image.svg" alt="placeholder image" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <p>Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.</p>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
        </section>
      </div>
    );
  }

}
