import React, { useState, useEffect, useCallback, useMemo } from "react";

const TextAreaBulleted = (props) => {
  const { bulletChar, onChange, fieldToChange, values, title } = props;
  const [lines, setLines] = useState(values.length > 0 ? values.length : 1);
  const [value, setValue] = useState(values.join("\n"));

  useEffect(() => {
    setValue(values.join("\n"));
  }, [values]);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      const values = newValue.split("\n");
      const curLines = values.length;
      if (curLines !== lines) {
        setLines(curLines);
      }
      setValue(newValue);
      // split the values and return array
      onChange({ value: values, fieldToChange });
    },
    [setValue, setLines, lines, onChange, fieldToChange]
  );

  const handleKeyPress = useCallback((e) => {
    // when enter pressed, reset scroll to left
    if (e.charCode === 13) {
      e.target.scrollLeft = 0;
    }
  }, []);

  return useMemo(() => {
    const height = 19 * lines + 50;
    const bullets = new Array(lines).fill(bulletChar);
    return (
      <div>
        <label class="block text-sm font-medium text-gray-700 font-bold">
          {title}
        </label>
        <div class="flex" style={{ height: `${height}px` }}>
          <div class="absolute pt-10px pb-10px pl-10px pr-10px">
            {bullets.map((bullet, i) => (
              <p key={`bullet-${i}`}>{bullet}</p>
            ))}
          </div>
          <textarea
            class="h-full w-full pl-30px pt-10px shadow-sm focus:outline-none mt-1 border border-gray-300 rounded-md text-sm font-light text-slate-gra"
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            style={{ resize: "none" }}
          />
        </div>
      </div>
    );
  }, [value, lines, handleChange, bulletChar, handleKeyPress, title]);
};

export default TextAreaBulleted;
