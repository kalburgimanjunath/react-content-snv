import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
export default function ListBookmarks({ bookmarks }) {
  let count = 0;
  return (
    <>
      <ListGroup>
        {bookmarks &&
          bookmarks.map((item) => {
            count++;
            let rowclass = count % 5 == 0 ? 'even' : 'odd';
            return (
              <>
                <ListGroupItem
                  key={item.id}
                  className={rowclass == 'even' ? 'active' : ''}
                >
                  <ListGroupItemHeading>
                    {item.fields['title']}
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    {item.fields['description']}
                  </ListGroupItemText>
                </ListGroupItem>
              </>
            );
          })}
      </ListGroup>
    </>
  );
}
