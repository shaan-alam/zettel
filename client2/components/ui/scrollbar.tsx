import { useTheme } from "next-themes";
import { Scrollbars, ScrollbarProps } from "react-custom-scrollbars-2";

interface IScrollbar extends ScrollbarProps {
  children: JSX.Element | JSX.Element[];
}

const Scrollbar: React.FC<IScrollbar> = ({ children, className, ...props }) => {
  const { theme } = useTheme();

  return (
    <Scrollbars
      universal={true}
      className={className}
      style={{ height: props.height, width: props.width }}
      renderThumbVertical={(style, ...props) => {
        return (
          <div
            style={{
              ...style,
              background: theme === "dark" ? "#444" : "#dfdfdf",
              opacity: 0.7,
              borderRadius: "7px",
            }}
            {...props}
          />
        );
      }}
      {...props}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
