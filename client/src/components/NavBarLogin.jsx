import { Tooltip, IconButton, Avatar } from "@mui/material";

export default function NavBarLogin() {
  return (
    <div className="min-w-[185px] flex justify-end">
      <Tooltip title="Conta">
        <IconButton onClick={() => {}} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
    </div>
  )
}