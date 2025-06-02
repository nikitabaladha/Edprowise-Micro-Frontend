// UnauthorizedPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  text-align: center;
`;

const LockIcon = styled.div`
  width: 120px;
  height: 120px;
  background: #ff4d4f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 10px 25px rgba(255, 77, 79, 0.3);

  &:before {
    content: "";
    position: absolute;
    width: 70px;
    height: 70px;
    border: 8px solid #fff;
    border-radius: 50%;
    box-sizing: border-box;
  }

  &:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 20px;
    background: #ff4d4f;
    top: -15px;
    border-radius: 5px 5px 0 0;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  padding: 12px 30px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  box-shadow: 0 5px 15px rgba(255, 77, 79, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: #ff7875;
    transform: translateY(-2px);
  }
`;

const UnauthorizedPage = () => {
  return (
    <Container>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <LockIcon></LockIcon>
      </motion.div>

      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        403 - Access Denied
      </Title>

      <Subtitle>
        Oops! You don't have permission to access this page.
        <br />
        If you believe this is an error, please contact your administrator.
      </Subtitle>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Go Home
          </Button>
        </Link>

        <Button
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ background: "#434343" }}
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default UnauthorizedPage;
