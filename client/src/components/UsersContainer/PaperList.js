import React from "react";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";

export const PaperList = ({ users }) =>
  <Paper zDepth={4}>
    <List>
      {users.map(user =>
        <Link
          to={`/profile/${user.username}`}
          key={user._id}
          style={{ textDecoration: "none" }}
        >
          <ListItem
            primaryText={user.username}
            leftAvatar={<Avatar src={user.profilePicture} />}
          />
        </Link>
      )}
    </List>
  </Paper>;
