import Leap from "leapjs/lib/index";
import { getCoords } from "./utils";

const myController = new Leap.Controller({enableGestures: true});
myController.connect();

export default function leapMovement() {
    myController.on( 'frame', ( frame ) => {

        this.player.setVelocityX( 0 );

        if ( this.player.anims.currentAnim.key !== 'idle' && frame.hands.length === 0 ) {
            this.player.anims.play( 'idle', true );
            this.player.setVelocityX( 0 );
        }

        frame.hands.forEach( hand => {
            this.palm = getCoords( hand.palmPosition, frame );

            this.player.setVelocityX( this.palm.x / 2 );

            if ( this.palm.x > 10 ) {
                if ( this.player.anims.currentAnim.key !== 'runRight' ) {
                    this.player.anims.play( 'runRight' );
                }
            }
            else if ( this.palm.x < -10 ) {
                if ( this.player.anims.currentAnim.key !== 'runLeft' ) {
                    this.player.anims.play( 'runLeft' );
                }
            }

            if ( hand.grabStrength >= .80 && this.player.body.touching.down ) {
                this.player.setVelocityY( -300 );
            }

        });
    } );
}