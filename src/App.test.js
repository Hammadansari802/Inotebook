import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
<Routes>
  {/* Root "/" par pehle About / Landing Page dikhega */}
  <Route exact path="/" element={<About showAlert={showAlert} />} />

  {/* Login hone ke baad banda "/notes" par aayega */}
  <Route exact path="/notes" element={<Home showAlert={showAlert} />} />

  <Route exact path="/login" element={<Login showAlert={showAlert} />} />
  <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
</Routes>