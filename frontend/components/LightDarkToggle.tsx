'use client'

import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function LightDarkToggle() {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (checked: boolean) => {
      setDarkMode(checked);
      document.documentElement.classList.toggle('dark')
    };
  
    return (
      <DarkModeSwitch
        style={{ marginLeft: '40px' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={30}
      />
    );
}
