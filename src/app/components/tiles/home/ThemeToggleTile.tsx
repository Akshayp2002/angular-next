'use client';
import styled from 'styled-components';

const ThemeToggleTile = () => {
    return (
        <StyledWrapper className="w-full h-full flex items-center justify-center">
            <div className="toggle-container">
                <input id="theme-switch" type="checkbox" className="hidden-input" />
                <div className="app-preview">
                    <div className="phone-body">
                        {/* Status Bar */}
                        <div className="status-bar">
                            {/* <div className="time">4:20</div> */}
                            {/* <div className="status-icons">
                                <div className="network-icon" />
                                <div className="battery-icon" />
                            </div> */}
                        </div>

                        {/* Main Content */}
                        <div className="main-content">
                            <div className="visual-circle">
                                <div className="crescent-moon" />
                            </div>

                            <label htmlFor="theme-switch" className="toggle-label">
                                <div className="sliding-knob" />
                                <div className="label-text">
                                    <p className="light-text">Light</p>
                                    <p className="dark-text">Dark</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  /* Container Scale */
  .toggle-container {
    scale: 0.9; /* Adjust this to make the phone UI fit your tile size */
  }

  .phone-body {
    position: relative;
    width: 19rem;
    height: 19rem;
    background-color: #ffffff;
    box-shadow: 0 4px 35px rgba(0, 0, 0, 0.05);
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
    overflow: hidden;
  }

  /* Status Bar */
  .status-bar {
    font-size: 0.75rem;
    opacity: 0.5;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-icons {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .battery-icon {
    width: 0.8rem;
    height: 0.4rem;
    background-color: black;
    border-radius: 1px;
  }

  .network-icon {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 6px 7px 6px;
    border-color: transparent transparent black transparent;
    transform: rotate(135deg);
  }

  /* Center Content */
  .main-content {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 75%;
    transform: translateY(-5%);
  }

  .visual-circle {
    position: relative;
    border-radius: 100%;
    width: 6.5rem;
    height: 6.5rem;
    background: linear-gradient(40deg, #FF0080, #FF8C00 70%);
    margin: 0 auto;
    transition: background 0.5s ease;
  }

  .crescent-moon {
    position: absolute;
    border-radius: 100%;
    right: 0;
    width: 5rem;
    height: 5rem;
    background: white;
    transform: scale(0);
    transform-origin: top right;
    transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  /* Toggle Switch */
  .toggle-label {
    width: 100%;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 100px;
    position: relative;
    margin-top: 1.5rem;
    cursor: pointer;
    display: block;
  }

  .sliding-knob {
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 100px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .label-text {
    font-size: 0.8rem;
    font-weight: 800;
    color: black;
    width: 70%;
    margin: 0 15%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    z-index: 2;
  }

  .dark-text {
    opacity: 0.4;
  }

  /* --- Logic for Checked State --- */
  .hidden-input {
    display: none;
  }

  .hidden-input:checked + .app-preview .sliding-knob {
    transform: translateX(100%);
    background-color: #34323D;
  }

  .hidden-input:checked + .app-preview .phone-body {
    background-color: #26242E;
  }

  .hidden-input:checked + .app-preview .time,
  .hidden-input:checked + .app-preview .light-text,
  .hidden-input:checked + .app-preview .dark-text {
    color: white;
    opacity: 1;
  }

  .hidden-input:checked + .app-preview .light-text {
    opacity: 0.4;
  }

  .hidden-input:checked + .app-preview .visual-circle {
    background: linear-gradient(40deg, #8983F7, #A3DAFB 70%);
  }

  .hidden-input:checked + .app-preview .crescent-moon {
    transform: scale(1);
    background: #26242E;
  }

  .hidden-input:checked + .app-preview .battery-icon {
    background-color: white;
  }

  .hidden-input:checked + .app-preview .network-icon {
    border-color: transparent transparent white transparent;
  }
`;

export default ThemeToggleTile;