import React from 'react';
import styled from 'styled-components/macro';
import { FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import { MobileOnly, useResponsive } from './responsiveComponents';

const FooterSeparator = styled.span`
  padding: 0 10px;
`;

const FooterContainer = styled.div`
  width: 100%;
  color: #e8e6e3;
  background-color: rgb(27, 28, 29);
  margin-top: 48px;
`;

const FooterContentContainer = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 100%;
  min-height: 64px;
  ${({ mobile }) => mobile && 'flex-direction: column; padding: 24px 0px'}
`;

export default function Footer() {
  const { isTabletOrMobile } = useResponsive();

  return (
    <FooterContainer>
      <FooterContentContainer mobile={isTabletOrMobile}>
        <div style={{ color: 'rgb(40, 199, 145)', fontWeight: 500 }}>
          Stock Dash
          <FooterSeparator>|</FooterSeparator>
          Created by <i>Zack 2020</i>
        </div>
        <MobileOnly>
          <br />
        </MobileOnly>
        <div>
          <a
            style={{ color: 'rgb(40, 199, 145)' }}
            href="https://github.com/Altzack"
          >
            <FaGithub size="25px" style={{ marginRight: 15 }} />
          </a>
          <a
            style={{ color: 'rgb(40, 199, 145)' }}
            href="https://www.linkedin.com/in/zack-altschuler"
          >
            <FaLinkedin size="25px" style={{ marginRight: 15 }} />
          </a>
          <a
            style={{ color: 'rgb(40, 199, 145)' }}
            href="mailto:altschulerzack@yahoo.com"
          >
            <FaTelegramPlane size="25px" style={{ marginRight: 15 }} />
          </a>
        </div>
      </FooterContentContainer>
    </FooterContainer>
  );
}
