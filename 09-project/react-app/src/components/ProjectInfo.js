const ProjectInfo = ({ name }) => {
  return (
    <>
      <div id='LabInfo' className='row'>
        <div className='col-lg-12'>
          <div id='lab-into-area'>
            <hr />
            <h5 className='font-weight-bold'>
              <a href='https://rob.soltani.io'>Rob (Sohrab) Soltani</a>
            </h5>
            <h4 className='font-weight-bold'>{name}</h4>
            <a
              rel='noreferrer'
              href='https://github.com/rob-soltani/CCPS-530'
              target='_blank'
            >
              <img
                src='/images/GitHub-BW-80x80.png'
                style={{ width: "25px", height: "25px" }}
                alt='GitHub Logo'
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
