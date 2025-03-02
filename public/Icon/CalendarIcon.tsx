const CalendarIcon = ({ fillcolor = 'black' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.6665 1.6665C7.12674 1.6665 7.49984 2.0396 7.49984 2.49984V3.33317H12.4998V2.49984C12.4998 2.0396 12.8729 1.6665 13.3332 1.6665C13.7934 1.6665 14.1665 2.0396 14.1665 2.49984L14.1665 3.33317C16.4677 3.33317 18.3332 5.19865 18.3332 7.49984V14.1665C18.3332 16.4677 16.4677 18.3332 14.1665 18.3332H5.83317C3.53198 18.3332 1.6665 16.4677 1.6665 14.1665V7.49983C1.6665 5.19865 3.53199 3.33317 5.83317 3.33317V2.49984C5.83317 2.0396 6.20627 1.6665 6.6665 1.6665ZM12.4998 4.99984V5.83317C12.4998 6.29341 12.8729 6.6665 13.3332 6.6665C13.7934 6.6665 14.1665 6.29341 14.1665 5.83317L14.1665 4.99984C15.5472 4.99984 16.6665 6.11913 16.6665 7.49984L3.33317 7.49983C3.33317 6.11912 4.45246 4.99984 5.83317 4.99984V5.83317C5.83317 6.29341 6.20627 6.6665 6.6665 6.6665C7.12674 6.6665 7.49984 6.29341 7.49984 5.83317V4.99984H12.4998ZM3.33317 9.1665V14.1665C3.33317 15.5472 4.45246 16.6665 5.83317 16.6665H14.1665C15.5472 16.6665 16.6665 15.5472 16.6665 14.1665V9.1665H3.33317Z"
        fill={fillcolor}
      />
    </svg>
  );
};

export default CalendarIcon;
