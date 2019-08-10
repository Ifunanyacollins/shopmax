import React from "react";
import {
  Grid,
  Placeholder,
  Segment,
  Button,
  Card,
  Divider,
  Label
} from "semantic-ui-react";

export const ProductLoader = () => (
  <Grid columns={3} stackable>
    <Grid.Column>
      <Segment raised>
        <Placeholder>
          <Placeholder.Image />
          <Placeholder.Paragraph>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Button className="action" disabled>
              Buy now
            </Button>
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>

    <Grid.Column>
      <Segment raised>
        <Placeholder>
          <Placeholder.Image />
          <Placeholder.Paragraph>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Button className="action" disabled>
              Buy now
            </Button>
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>

    <Grid.Column>
      <Segment raised>
        <Placeholder>
          <Placeholder.Image />
          <Placeholder.Paragraph>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Button className="action" disabled>
              Buy now
            </Button>
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>
  </Grid>
);

export const CategoryLoader = () => (
  <Card>
    <Card.Content>
      <Placeholder>
        <Divider />
      </Placeholder>
      <Placeholder>
        <Divider />
      </Placeholder>

      <Placeholder>
        <Divider />
      </Placeholder>

      <Placeholder>
        <Divider />
      </Placeholder>
    </Card.Content>
  </Card>
);

export const ColorLoader = () => (
  <Placeholder>
    <Label circular />
    <Label circular />
    <Label circular />
    <Label circular />
    <Label circular />
    <Label circular />
    <Label circular />
    <Label circular />
  </Placeholder>
);

export const CartLoader = () => (
  <div>
    <Segment raised>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>

    <Segment raised>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>

    <Segment raised>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
  </div>
);
